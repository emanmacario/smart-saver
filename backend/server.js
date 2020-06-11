const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Establish connection to MongoDB Atlas Cluster
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connection to MongoDB cluster established');
});

// Set routers
const userRouter = require('./routes/userRoute');
app.use('/user', userRouter);

// Passively listen on specified port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});