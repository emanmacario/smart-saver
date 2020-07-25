const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');


const verifyCallback = (username, password, done) => {
  console.log("=== VERIFY CALLBACK ===");
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
  // console.log('*** serializeUser called, user: ')
  // console.log(user) // the whole raw user object!
  // console.log('---------')
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  // console.log('*** deserializeUser called')
  User.findById(userId)
    .then((user) => {
      // console.log('USER:')
      // console.log(user)
      // console.log('--------------')
      done(null, user);
    })
    .catch((err => {
      // console.log("Error deserializing user");
      // console.log('--------------')
      done(err);
    }));
});

