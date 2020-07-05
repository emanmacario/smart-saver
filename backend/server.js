const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const connection = require('./config/database');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();


const router = require('express').Router;


// GENERAL SETUP
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSIONS SETUP
const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24  // Equals one day
    }
}));

// PASSPORT AUTHENTICATION
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Debugging middleware
app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});


// SET ROUTES
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
app.use('/users', userRouter);
app.use('/products', productRouter);


// SERVER
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});