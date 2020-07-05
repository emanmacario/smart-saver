const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
let User = require('../models/userModel');


router.route('/helloWorld').get((req, res) => {
    res.json({'Hello world': true});
});


router.route('/samplePost').post((req, res) => {
    res.status(200).json({"hello": "world"});
})


router.route('/').get((req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


router.route('/register').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        username: username,
        email: email,
        password: password
    });
    // DEBUGGING
    console.log("Someone is registering");
    console.log(newUser);


    newUser.save()
        .then(() => {
            res.status(200).json({'success': true});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({'success': false});
        });
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        name: name,
        email: email,
        password: password
    });
    // DEBUGGING
    console.log(user);

    user.save()
        .then(() => {
            res.status(200).json({'success': true});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({'success': false});
        });
});


router.route('/login', passport.authenticate('local', { failureRedirect: '/', successRedirect: '/viewProducts'}));


router.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/'); 
});


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