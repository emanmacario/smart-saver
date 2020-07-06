const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const connection = require('./config/database');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();


// GENERAL SETUP
const app = express();
const port = process.env.PORT || 5000;

//app.use(cors());


app.use(cors({
    origin:[process.env.ORIGIN],//frontend server localhost:8080
    methods:['GET','POST','PUT','DELETE'],
    credentials: true // enable set cookie
   }));
   
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSIONS SETUP
const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });

app.use(cookieParser(process.env.SECRET));
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


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-   Type, Accept, Authorization");
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


// SERVER
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});