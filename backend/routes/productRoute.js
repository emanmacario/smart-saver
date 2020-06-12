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

    // TODO: Make call to Woolworths API endpoint
    // TODO: Parse JSON response
    // TODO: Save product to database

    const product = new Product({
        name: 'sirena tuna',
        prevPrice: 0,
        price: 1,
        onSpecial: true,
        imagePath: 'http://image.com',
        savingsAmount: 0
    });

    product.save()
        .then(() => {
            res.status(200).json({ 'success': true });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ 'success': false });
        });
});


// Check the validity of the URL before adding to database
const validateUrl = (url) => {
    return false;
}


module.exports = router;