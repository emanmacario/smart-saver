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


// Returns a user object if a user is authenticated
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

    // TODO: Add product to database using user id
    console.log("Valid URL entered");
    //res.status(200).json({ success: true, message: 'Valid URL entered [from server]'});
    //return;
    console.log(req.user);

    User.findById(req.user._id)
        .then(async (user) => {

            // TODO: Need to ensure no duplicate products added for same user

            // Add the product for the user
            const product = await createProductObject(url);
            if (product) {                
                User.findOneAndUpdate(
                    { _id: user._id },
                    { $push: { products: product } },
                    (err, success) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(success);
                        }
                });
                res.status(200).json({ success: true, message: 'Product has been added' });
            } else {
                res.status(400).json({ success: false, message: 'Product could not be found' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false, message: 'User could not be found' });
        });

});


// UNTESTED ENDPOINT
router.route('/products').get(isAuth, (req, res) => {
    // TODO: Get products from database and return
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
        prevPrice: info['WasPrice'],
        price: info['InstorePrice'],
        onSpecial: info['InstoreIsOnSpecial'],
        imagePath: info['LargeImageFile'],
        savingsAmount: info['InstoreSavingsAmount']
    }

    console.log(JSON.stringify(product));


    return new Product(product);
}




/*
router.route('/add').post((req, res) => {
    const url = req.body.url;
    console.log(url);
    validUrl = validateUrl(url);
    if (!validUrl) {
        res.status(200).json({ 'success': false, 'message': 'Invalid URL entered, please try again' });
        return;
    }

    // TODO: Make call to Woolworths API endpoint [DONE]
    // TODO: Parse JSON response [DONE]
    // TODO: Save product to database [DONE]

    const details = getProductDetails(url);
    console.log("Product details is null: " + details);
    details
    .then(result => {
        const product = createProductObject(result);
        product.save()
            .then(() => {
                res.status(200).json({ 'success': true });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ 'success': false });
            });
    })
    .catch(err => {
        console.log(err);
        res.status(200).json({success: false, message: 'Error retrieving product details'});
    })
});




*/


/* router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
        // Validate the password
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                res.status(200).json({'success': false, 'message': 'There was an error, please try again'});
            }
            if (isMatch) {
                res.status(200).json({'success': true, 'message': 'Logged in succesfully'});
            } else {
                res.status(400).json({'success': false, 'message': 'The details you have entered are invalid'});
            }
        });
    })
    .catch(err => {
        res.status(400).json({'success': false, 'message': 'Could not find a user with that email address'})
    });
}); */

module.exports = router;