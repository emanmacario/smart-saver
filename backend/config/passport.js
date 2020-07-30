const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');


const verifyCallback = (username, password, done) => {
  console.log('Attempting to authenticate user...');
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        console.log("User not found!");
        return done(null, false);
      }
      user.comparePassword(password, function(err, isValid) {
        if (isValid) {
          console.log("Valid password entered for user");
          return done(null, user);
        } else {
          console.log("Invalid password entered for user");
          return done(null, false);
        }
      });
    })
    .catch((err) => {
      done(err);
    });
}

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      const { _id, username, email } = user;
      done(null, { _id, username, email });
    })
    .catch((err => {
      done(err);
    }));
});

