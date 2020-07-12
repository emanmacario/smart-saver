const router = require('express').Router();
const axios = require('axios').default;
const bcrypt = require('bcrypt');
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
    // DEBUGGING
    console.log(newUser);

    newUser.save()
        .then(() => {
            res.status(200).json({ success: true, message: 'User successfully created' });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ success: false, message: 'User could not be created' });
        });
});

// User login endpoint
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log("Route login callback called");
        if (err) {
            res.status(500).json({ message: "Something went wrong authenticating the user" });
            return;
        }

        if (!user) {
            res.status(401).json(info);
            return;
        }

        // Save user in session
        req.logIn(user, (err) => {
            console.log("req.logIn was called!");
            if (err) {
                res.status(500).json({ message: "Session could not save user" });
                return;
            }
            console.log("Returning user, login successful");
            res.status(200).json({ success: true, user: user });
        });
    })(req, res, next);
});

// User logout endpoint
router.route('/logout').get((req, res) => {
    if (req.user) {
        req.logout();
        res.json({ message: "User logged out" });
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
            const productNumber = getProductNumber(url);
            console.log(`Product Number: ${productNumber}`);
            var isDuplicate = false;

            for (let product of user.products) {
                if (productNumber == product.productNumber) {
                    console.log("Duplicate product found for user");
                    isDuplicate = true;
                    res.status(400).json({ success: false, message: 'Duplicate URL entered' });
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
                                    res.status(200).json({ success: true, message: 'Product has been added' });
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


// Gets products for a user
router.route('/products').get(isAuth, (req, res) => {
    User.findById(req.user._id)
        .then((user) => {
            res.status(200).json({
                success: true,
                message: 'Products successfully retrieved',
                products: user.products
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false, message: 'User could not be found' });
        });
});



// ANOTHER UNTESTED ENDPOINT
router.route('/products/:productNumber').delete(isAuth, (req, res) => {
    // TODO: Delete product for user if it exists
    const { productNumber } = req.params;
    console.log(`Trying to delete: ${productNumber}`);

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { products: { productNumber: productNumber } } },
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


/* --- HELPER FUNCTIONS --- */

// TODO: Refactor helper functions into another file

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

// Obtain Woolworths product details, such as price, from 
// the  publicly exposed Woolworths product API endpoint
const getProductInfo = async (url) => {
    const productNumber = getProductNumber(url);
    const endpoint = `https://www.woolworths.com.au/apis/ui/product/detail/${productNumber}`;
    return await axios.get(endpoint);
}

// Create a product object that can be stored in the MongoDB database
const createProductObject = async (url) => {
    const res = await getProductInfo(url);
    const info = res.data['Product'];

    // Sanity check to see if product actually exists
    if (!info) {
        return null;
    }
    /*
    console.log(`Name: ${info['Name']}`);
    console.log(`WasPrice: ${info['WasPrice']}`);
    console.log(`InStorePrice: ${info['InstorePrice']}`);
    console.log(`InStoreIsOnSpecial: ${info['InstoreIsOnSpecial']}`);
    console.log(`LargeImageFile: ${info['LargeImageFile']}`);
    console.log(`InStoreSavingsAmount: ${info['InstoreSavingsAmount']}`);
    */

    const product = {
        productNumber: getProductNumber(url),
        name: info['Name'],
        description: info['Description'],
        prevPrice: info['WasPrice'],
        price: info['InstorePrice'],
        prevOnSpecial: false,
        onSpecial: info['InstoreIsOnSpecial'],
        imagePath: info['LargeImageFile'],
        savingsAmount: info['InstoreSavingsAmount']
    }

    console.log(JSON.stringify(product));
    return new Product(product);
}

module.exports = router;