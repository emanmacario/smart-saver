const express = require('express');
const cors = require('cors');
const boolParser = require('express-query-boolean');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const cron = require('node-cron');
const config = require('../config');


module.exports = ({ app, connection }) => {
  // Configure CORS and other necessary middleware
  app.use(cors({ 
    credentials: true,
    origin: config.origin
  }));
  app.use(express.json());
  app.use(boolParser());
  app.use(express.urlencoded({ extended: true }));

  // Trust first proxy
  if (config.nodeEnv == 'production') {
    app.set('trust proxy', 1)
  }

  // Sessions setup
  let cookie;
  if (config.nodeEnv == 'development') {
    cookie = {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  } else {
    cookie = {
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none"
    }
  }

  app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ 
      mongooseConnection: connection, 
      collection: 'sessions' 
    }),
    cookie: cookie
  }));

  // Set HTTP headers for CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // Initialise Passport authentication middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Schedule CRON job for user email notifications
  // Runs everyday at 6:30PM AEST, 30 minutes after
  // all user products are updated on MongoDB Realm
  const emailUsers = require('../jobs/emailUsers');
  cron.schedule('30 20 * * *', emailUsers);

  // Set routes
  const userRouter = require('../controllers/routes/userRoute');
  const productRouter = require('../controllers/routes/productRoute');
  const healthCheckRouter = require('../controllers/routes/healthCheckRoute');
  app.use('/users', userRouter);
  app.use('/users', productRouter);
  app.use('/healthcheck', healthCheckRouter);
}

