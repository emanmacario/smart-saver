const mongoose = require('mongoose');

require('dotenv').config();


// Establish a connection to MongoDB Atlas Cluster
const DB_STRING = process.env.DB_STRING;

mongoose.connect(DB_STRING, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connection to MongoDB cluster established');
});

// Expose the connection
module.exports = connection;