const User = require('../models/userModel');
const ProductService = require('./productService');

const ProductServiceInstance = new ProductService();


class UserService {
  /**
   * Registers a user in the database (if their given username 
   * has not already been taken)
   * @param {object} user user object containing username, email, and password
   */
  async register(user) {
    // Create a new user
    let newUser = User(user);

    // Check for an existing user with the same username
    try {
      const { username } = user;
      let existingUser = await User.findOne({ username: username });
      if (existingUser) {
        return { code: 400, success: false, message: 'Sorry, that username has already been taken' }
      }
    } catch (err) {
      console.warn(err);
      return { code: 500, success: false, message: 'Sorry, we could not create your account right now' }
    }
    
    // User credentials are valid, save user in the database
    try {
      await newUser.save();
      return { code: 200, success: true, message: 'Your account has been created' }
    } catch (err) {
      console.warn(err)
      return { code: 500, success: false, message: 'Sorry, we could not create your account right now' }
    }
  }

  /**
   * Finds and returns a user with the given user record ID
   * @param {string} userId user record ID
   */
  async getUser(userId) {
    // Find the user with the given ID, or null, if not found
    return await User.findById(userId);
  }


  /**
   * Retrieves the products for a specific user that match a certain query
   * @param {object} query query containing page number, product name, and on special filter values
   * @param {string} userId user record ID 
   */
  async getProducts(query, userId) {
    // Fetch products based on the page number, product name, and if they are on special
    let { page, name, onSpecial } = query;

    // Find the user
    let user = await this.getUser(userId);
    if (!user) {
      return { success: false, message: `Could not find user with ID ${userId}`, products: null };
    }

    // Filter, paginate, and return the user's products
    let filtered = ProductServiceInstance.filter(user.products, name, onSpecial);
    let paginated = ProductServiceInstance.paginate(filtered, page);
    return { success: true, message: 'Products successfully retrieved', products: paginated };
  }


   /**
   * Adds a given Woolworths product via URL to the user's product list
   * @param {string} url Woolworths product URL
   * @param {string} userId user record ID 
   */
  async addProduct(url, userId) {
    // Validate the product URL
    let isValidURL = ProductServiceInstance.isValidURL(url);
    if (!isValidURL) {
      return { success: false, message: 'Invalid URL entered, please try again' };
    }

    // Find the specific user for which this product is to be added for
    let user = await this.getUser(userId);
    if (!user) {
      return { success: false, message: 'User could not be found' };
    }

    // Check if user has already added the product
    let number = ProductServiceInstance.getProductNumber(url);
    let isDuplicate = user.products.some(product => product.number == number);

    // Add the product for the specified user if it is not a duplicate
    if (!isDuplicate) {
      let product = await ProductServiceInstance.createProductModel(url);
      if (product) {
        try {
          await User.findOneAndUpdate(
            { _id: user._id },
            { $push: { products: product } }
          )
          return { success: true, message: 'Your product has been added' };
        } catch (err) {
          console.log(err);
          return { success: false, message: 'Your product could not be saved' };
        }
      } else {
        return { success: false, message: 'Product could not be found' };
      }
    } else {
      return { success: false, message: 'You have already added this product' };
    }
  }

  /**
   * Deletes a given Woolworths product from a user's product list
   * @param {number} number product number
   * @param {string} userId user record ID 
   */
  async deleteProduct(userId, number) {
    console.log(`Trying to delete product number '${number}' for user '${userId}'`);
    try {
      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { products: { number: number } } }
      )
      return { success: true, message: 'Product successfully deleted' };
    } catch (err) {
      console.log(err);
      return { success: false, message: 'Product could not be deleted' };
    }
  }
}

module.exports = UserService;