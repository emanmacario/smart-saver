const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const isAuth = require('../middlewares/authMiddleware');
const User = require('../../models/userModel');
const UserService = require('../../services/userService');

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
router.route('/register').post(async (req, res) => {
  const { username, email, password } = req.body;
  const user = {
    username: username,
    email: email,
    password: password,
    products: []
  }

  const { code, success, message } = await UserService.register(user);
  res.status(code).json({ success: success, message: message });


  // const newUser = new User({
  //   username: username,
  //   email: email,
  //   password: password,
  //   products: []
  // });

  // // Check if username is available
  // User.findOne({ username: username })
  //   .then((user) => {
  //     // User with username already exists
  //     if (user) {
  //       return res.status(400).json({ success: false, message: 'Sorry, that username has already been taken' });
  //     }
  //     // Username is available, save new user
  //     newUser.save()
  //     .then(() => {
  //       res.status(200).json({ success: true, message: 'Your account has successfully been created' });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ success: false, message: 'Sorry, we could not create your account right now. Please try again!' });
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
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
router.route('/logout').get(isAuth, (req, res) => {
  req.logout();
  res.json({ message: "User logged out successfully" });
});


module.exports = router;