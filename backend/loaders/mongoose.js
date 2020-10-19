const mongoose = require('mongoose');
const config = require('../config');


module.exports = async () => {
  // Establish a connection to the MongoDB Atlas Cluster
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  return connection.connection;
}