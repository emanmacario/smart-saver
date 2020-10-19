const User = require('../models/userModel');


class UserService {
  /**
   * Registers a user in the database (if their given username 
   * has not already been taken)
   * @param {object} user user object containing username, email, and password
   */
  async register(user) {
    // Create a new user
    let newUser = User(user);

    // Check for an existing user with the same username
    try {
      const { username } = user;
      let existingUser = await User.findOne({ username: username });
      if (existingUser) {
        return { code: 400, success: false, message: 'Sorry, that username has already been taken' }
      }
    } catch (err) {
      console.warn(err);
      return { code: 500, success: false, message: 'Sorry, we could not create your account right now' }
    }
    

    // User credentials are valid, save user in the database
    try {
      await newUser.save();
      return { code: 200, success: true, message: 'Your account has been created' }
    } catch (err) {
      console.warn(err)
      return { code: 500, success: false, message: 'Sorry, we could not create your account right now' }
    }
  }

}

module.exports = UserService;