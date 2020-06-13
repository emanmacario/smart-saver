const router = require('express').Router();
const axios = require('axios').default;
let Product = require('../models/productModel');


router.route('/').get((req, res) => {
    Product.find()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


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


// Check the validity of the Woolworths product URL 
// before making a call to the Woolworths API
const validateUrl = (url) => {
    const expression = /((https?)\/\/)?(www\.)?woolworths.com.au\/shop\/productdetails\/[0-9]+\/[a-z0-9-]+/;
    const regex = new RegExp(expression);

    if (url.match(regex)) {
        return true;
    }
    return false;
}

// Extract the product number from the validated Woolworths product URL
const getProductNumber = (url) => {
    var matches = url.match(/(\d+)/);
    if (matches) {
        // Product number will always be first sequence of numbers in URL
        return matches[0];
    }
}

// Obtain Woolworths product details, such as price, from the 
// publicly exposed Woolworths product API endpoint
const getProductDetails = async (url) => {
    const productNumber = getProductNumber(url);
    const endpoint = `https://www.woolworths.com.au/apis/ui/product/detail/${productNumber}`;

    try {
        const response = await axios.get(endpoint);
        console.log(response.status);
        //console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// Create a product object that can be stored in the MongoDB database
const createProductObject = (productDetails) => {
    productDetails = productDetails['Product'];

    //console.log(JSON.stringify(productDetails));

    console.log(`Name: ${productDetails['Name']}`);
    console.log(`WasPrice: ${productDetails['WasPrice']}`);
    console.log(`InStorePrice: ${productDetails['InstorePrice']}`);
    console.log(`InStoreIsOnSpecial: ${productDetails['InstoreIsOnSpecial']}`);
    console.log(`LargeImageFile: ${productDetails['LargeImageFile']}`);
    console.log(`InStoreSavingsAmount: ${productDetails['InstoreSavingsAmount']}`);

    const product = {
        name: productDetails['Name'],
        prevPrice: productDetails['WasPrice'],
        price: productDetails['InstorePrice'],
        onSpecial: productDetails['InstoreIsOnSpecial'],
        imagePath: productDetails['LargeImageFile'],
        savingsAmount: productDetails['InstoreSavingsAmount']
    }

    console.log(JSON.stringify(product));

    return new Product(product);
}

module.exports = router;