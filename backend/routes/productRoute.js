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
    const product = createProductObject(details);

    product.save()
        .then(() => {
            res.status(200).json({ 'success': true });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ 'success': false });
        });
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
    const endpoint = `https://www.woolworths.com.au/apis/ui/product/detail/${productNumber}?isMobile=false`;

    try {
        const response = await axios.get(endpoint);
        console.log(response.status);
        //console.log(response.data);
        return response;
    } catch (err) {
        console.log(err);
    }
}

// Create a product object that can be stored in the MongoDB database
const createProductObject = (productDetails) => {
    productDetails = productDetails['Product'];

    const product = new Product({
        name: productDetails['Name'],
        prevPrice: productDetails['WasPrice'],
        price: productDetails['InstorePrice'],
        onSpecial: productDetails['InstoreIsOnSpecial'],
        imagePath: productDetails['LargeImageFile'],
        savingsAmount: productDetatils['InstoreSavingsAmount']
    });

    console.log(product);

    return product;
}

module.exports = router;