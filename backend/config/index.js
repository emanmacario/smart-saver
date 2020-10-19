const envFound = require('dotenv').config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (envFound.error) {
  // This should crash the whole process
  throw new Error("Couldn't find .env file");
}

export default {
  port: process.env.PORT,
  databaseURL: process.env.MONGODB_URI,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  origin: process.env.ORIGIN,
  secret: process.env.SECRET,
  nodeEnv: process.env.NODE_ENV
}