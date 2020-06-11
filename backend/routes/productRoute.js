const router = require('express').Router();
const axios = require('axios').default;
let Product = require('../models/userModel');


router.route('/').get((req, res) => {
    Product.find()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


router.route('/add').get((req, res) => {
    const url = req.body.url;

    // TODO: Make call to Woolworths API endpoint
    // TODO: Parse JSON response
    // TODO: Save product to database
});


module.exports = router;