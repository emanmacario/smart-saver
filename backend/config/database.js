const mongoose = require('mongoose');
require('dotenv').config();


// Establish a connection to MongoDB Atlas Cluster
mongoose.connect(process.env.DB_STRING, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Connection to MongoDB cluster established');
});


// Expose the connection
module.exports = connection;