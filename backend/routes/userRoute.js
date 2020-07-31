const router = require('express').Router();
const axios = require('axios').default;
const fetch = require('node-fetch');
const passport = require('passport');
const mongoose = require('mongoose');
const isAuth = require('./authMiddleware');
const { Product } = require('../models/productModel');
const User = require('../models/userModel');

// Suppress Mongoose deprecation warnings
mongoose.set('useFindAndModify', false);


// Returns a user object for an authenticated user
router.route('/').get((req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// User sign up endpoint
router.route('/register').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    username: username,
    email: email,
    password: password,
    products: []
  });

  // Check if username is available
  User.findOne({ username: username })
    .then((user) => {
      // User with username already exists
      if (user) {
        return res.status(400).json({ success: false, message: 'Sorry, that username has already been taken' });
      }
      // Username is available, save new user
      newUser.save()
      .then(() => {
        res.status(200).json({ success: true, message: 'Your account has successfully been created' });
      })
      .catch((err) => {
        res.status(500).json({ success: false, message: 'Sorry, we could not create your account right now. Please try again!' });
      });
    })
    .catch((err) => {
      console.log(err);
    })
});

// User login endpoint
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Something went wrong authenticating the user" });
    }

    if (!user) {
      console.log("No user found when authenticating credentials with Passport");
      return res.status(400).json({ success: false, message: "The details you have entered are invalid, please try again" })
    }

    // Save user in session
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving user to session" });
      }
      res.status(200).json({ success: true, user: user });
    });
  })(req, res, next);
});

// User logout endpoint
router.route('/logout').get((req, res) => {
  if (req.user) {
    req.logout();
    res.json({ message: "Logged user out" });
  } else {
    res.json({ message: "No user to log out" });
  }
});


// User products routes
router.route('/products').post(isAuth, (req, res) => {
  // Validate the URL
  const url = req.body.url;
  console.log(url);
  valid = validUrl(url);
  if (!valid) {
    return res.status(400).json({ success: false, message: 'Invalid URL entered, please try again' });
  }
  console.log("Valid URL entered");

  User.findById(req.user._id)
    .then(async (user) => {

      // Check if user has already added the product
      const number = getProductNumber(url);
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
          const product = await createProductObject(url);
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
      const filtered = filter(user.products, name, onSpecial);
      const products = paginate(filtered, page);
      res.status(200).json({ success: true, message: 'Products successfully retrieved', products: products });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: 'Could not find user' });
    });
});


router.route('/products/:number').delete(isAuth, (req, res) => {
  const { number } = req.params;
  console.log(`Trying to delete: ${number}`);

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { products: { number: number } } },
    (err, success) => {
      if (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Product could not be deleted' });
      } else {
        console.log(success);
        res.status(200).json({ success: true, message: 'Product successfully deleted' });
      }
    }
  );
});

/* --- Product Helper Functions --- */

/**
 * Filters an array of user products to return
 * only the products that match the name and
 * onSpecial property values
 * @param {array} products 
 * @param {string} name 
 * @param {boolean} onSpecial 
 */
const filter = (products, name, onSpecial) => {
  const matches = products.filter((product) => {
    let c1 = true,
        c2 = true;
    if (name) {
      c1 = product.name.toLowerCase().includes(name.toLowerCase());
    }
    if (onSpecial) {
      c2 = product.onSpecial;
    }
    return c1 && c2;
  })
  return matches
}

/**
 * 
 * @param {array} products 
 * @param {number} page 
 */
const paginate = (products, page) => {
  const PRODUCTS_PER_PAGE = 5;
  const firstIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const secondIndex = firstIndex + PRODUCTS_PER_PAGE;
  return products.slice(firstIndex, secondIndex)
}


// Check the validity of the Woolworths product URL 
// before making a call to the Woolworths API
const validUrl = (url) => {
  const expression = /((https?)\/\/)?(www\.)?woolworths.com.au\/shop\/productdetails\/[0-9]+\/[a-z0-9-]+/;
  const regex = new RegExp(expression);
  return url.match(regex);
}


// Extract the product number from the validated Woolworths product URL
const getProductNumber = (url) => {
  var matches = url.match(/(\d+)/);
  if (matches) {
    // Product number will always be first sequence of numbers in URL
    return Number(matches[0]);
  }
}

// // Obtain Woolworths product details, such as price, from 
// // the publicly exposed Woolworths product API endpoint
// const getProductData= async (url) => {
//   const number = getProductNumber(url);
//   const endpoint = `https://www.woolworths.com.au/apis/ui/product/detail/${number}`;
//   const instance = axios.create();
//   return await instance.get(endpoint, { headers: { 'X-Requested-With': 'XMLHttpRequest' }});
// }



const getProductData = async (url) => {
  const number = getProductNumber(url);
  const endpoint = `https://www.woolworths.com.au/apis/ui/product/detail/${number}`;
  
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(endpoint, options);
  const json = await response.json();
  console.log(json);
  return json.Product;
}


// const createProductObject = async (number) => {
//   const data = await getProductData(number);

//   //console.log(`Data: ${JSON.stringify(data)}`);

//   // Sanity check to see if product actually exists
//   if (!data) {
//     console.log('No fucking data');
//     return null;
//   }

//   console.log(data.Name);
//   console.log(data.Description);
//   console.log(data.InstorePrice);
// }




// Create a product object that can be stored in the MongoDB database
const createProductObject = async (url) => {
  const data = await getProductData(url);

  // Sanity check to see if product actually exists
  if (!data) {
    console.log('No fucking data!');
    return null;
  }
  
  const {
    Name: name,
    Description: description,
    InstoreWasPrice: prevPrice,
    InstorePrice: price,
    InstoreIsOnSpecial: onSpecial,
    LargeImageFile: imagePath,
    InstoreSavingsAmount: savingsAmount
  } = data;

  const product = { 
    name, 
    number: getProductNumber(url),
    url: url,
    description, 
    prevPrice, 
    price,
    prevOnSpecial: false,
    onSpecial, 
    imagePath, 
    savingsAmount,
    lastOnSpecialStart: onSpecial ? new Date() : null,
    lastOnSpecialEnd: null
  }

  console.log(JSON.stringify(product));
  return new Product(product);
}

module.exports = router;