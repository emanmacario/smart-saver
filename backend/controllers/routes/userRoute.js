const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const isAuth = require('../middlewares/authMiddleware');
const User = require('../../models/userModel');
const UserService = require('../../services/userService');
const UserServiceInstance = new UserService();

// Suppress Mongoose deprecation warnings
mongoose.set('useFindAndModify', false);


// Returns a user object for an authenticated user
router.route('/').get((req, res) => {
  res.status(200).json({ user: req.user });
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

  try {
    const { success, message } = await UserServiceInstance.register(user);
    let code = success ? 200 : 400;
    res.status(code).json({ success: success, message: message });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
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
        return res.status(500).json({ success: false, message: "Error saving user to session" });
      }
      res.status(200).json({ success: true, user: user });
    });
  })(req, res, next);
});

// User logout endpoint
router.route('/logout').get(isAuth, (req, res) => {
  req.logout();
  res.json({ success: true, message: "User logged out successfully" });
});


module.exports = router;