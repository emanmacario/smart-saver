const express = require('express');
const cors = require('cors');
const boolParser = require('express-query-boolean');
const session = require('express-session');
const passport = require('passport');
const connection = require('./config/database');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();


// Trying Node CRON job for emails
const cron = require('node-cron');


// GENERAL SETUP
const app = express();
const port = process.env.PORT || 5000;


app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
//app.use(cors());

app.use(express.json());
app.use(boolParser());
app.use(express.urlencoded({ extended: true }));




// SESSIONS SETUP
const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24  // Equals one day
    }
}));


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.ORIGIN);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

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


// Schedule CRON job
// const emailUsers = require('./realm/emailUsers');
//cron.schedule('* * * * *', emailUsers);
// emailUsers();



// SERVER
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});