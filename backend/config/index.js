const envFound = require('dotenv').config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
  port: process.env.PORT || 5000,
  databaseURL: process.env.MONGODB_URI,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  origin: process.env.ORIGIN,
  secret: process.env.SECRET,
  nodeEnv: process.env.NODE_ENV
}