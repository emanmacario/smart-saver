const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
let User = require('../models/userModel');
const { NavbarText } = require('react-bootstrap/Navbar');


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
        password: password
    });
    // DEBUGGING
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
        res.json({ message: "Logging out" });
    } else {
        res.json({ message: "No user to log out" });
    }
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