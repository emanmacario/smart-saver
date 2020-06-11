const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/userModel');

router.route('/').get((req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


router.route('/add').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        email: email,
        password: password
    });

    user.save()
        .then(() => {
            res.status(200).json({ 'success': true });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ 'success': false });
        });
});


router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
        // Validate the password
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                res.status(200).json({ 'success': false, 'message': 'There was an error, please try again'});
            }
            if (isMatch) {
                res.status(200).json({ 'success': true });
            } else {
                res.status(200).json({ 'success': false, 'message': 'The details you have entered are invalid'});
            }
        });
    })
    .catch(err => {
        res.status(400).json({'success': false, 'message': 'Could not find a user with that email address'})
    });
});

module.exports = router;