// const axios = require('axios').default;
const router = require('express').Router();
const User = require('../../models/userModel');
const isAuth = require('../middlewares/authMiddleware');
const UserService = require('../../services/userService');
const ProductService = require('../../services/productService');
const { Product } = require('../../models/productModel');


const UserServiceInstance = new UserService();
const ProductServiceInstance = new ProductService();

// User products routes
router.route('/products').post(isAuth, (req, res) => {
  // Validate the URL
  const url = req.body.url;
  const userId = req.user._id;

  console.log(url);
  console.log(userId);



  valid = ProductServiceInstance.validUrl(url);
  if (!valid) {
    return res.status(400).json({ success: false, message: 'Invalid URL entered, please try again' });
  }
  console.log("Valid URL entered");

  User.findById(req.user._id)
    .then(async (user) => {

      // Check if user has already added the product
      const number = ProductServiceInstance.getProductNumber(url);
      console.log(`Product Number: ${number}`);
      var isDuplicate = false;

      for (let product of user.products) {
        if (number == product.number) {
          console.log("Duplicate product found for user");
          isDuplicate = true;
          res.status(400).json({ success: false, message: 'You have already added this product' });
          break;
        }
      }

      // Add the product for the specified user if they have not already added it
      if (!isDuplicate) {
        try {
          const product = await ProductServiceInstance.createProductObject(url);
          if (product) {                
            User.findOneAndUpdate(
              { _id: user._id },
              { $push: { products: product } },
              (err, success) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({ success: false, message: 'Product could not be saved' });
                } else {
                  console.log(success);
                  res.status(200).json({ success: true, message: 'Your product has been added' });
                }
              }
            );
          } else {
            res.status(400).json({ success: false, message: 'Product could not be found' });
          }
        } catch (err) {
          console.log(err);
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: 'User could not be found' });
    });

});


// GET endpoint for user products
router.route('/products').get(isAuth, (req, res) => {
  let { page, name, onSpecial } = req.query;

  User.findById(req.user._id)
    .then((user) => {
      const filtered = ProductServiceInstance.filter(user.products, name, onSpecial);
      const products = ProductServiceInstance.paginate(filtered, page);
      res.status(200).json({ success: true, message: 'Products successfully retrieved', products: products });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: 'Could not find user' });
    });
});


router.route('/products/:number').delete(isAuth, async (req, res) => {
  const { number } = req.params;
  const userId = req.user._id;

  const { success, message } = await UserServiceInstance.deleteProduct(userId, number);
  let code = success ? 200 : 500;
  res.status(code).json({ success: success, message: message });
});


module.exports = router;