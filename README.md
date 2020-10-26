# 🍎 Smart Saver

Smart Saver is a web application that allows for automatic notification of users regarding specials on their favourite Woolworths products.


## ⚡ Motivation

The motivation behind building this web application was to automate the tedious and repetitive task of checking whether Woolworths products are on special, using their website.

This is handy for products that are seldom on special, such as dog food, canned tuna and peanut butter etc. which can be bought in bulk to save money.

Rather than checking every few days, a user can just add multiple products at once and automatically receive a notification email whenever a product goes on special.


## 💻 Technologies Used
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This website was built using:

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud database storage, [Express.js](https://expressjs.com/), [React.js](https://reactjs.org/) and [Node.js](https://nodejs.org/)
- [MongoDB Realm's](https://www.mongodb.com/realm) serverless and trigger-based architecture for batch updating user product data as a CRON job
- [Passport.js](http://www.passportjs.org/) for session-based user authentication and backend API endpoint authorisation
- [AWS CodePipeline](https://aws.amazon.com/codepipeline/), [AWS CodeBuild](https://aws.amazon.com/codebuild/), and [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) for a CI/CD pipeline and backend server deployment
- [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/) for enabling HTTPS for my Elastic Beanstalk server environment, allowing client requests to be encrypted between the frontend web server to the AWS application load balancer
- [Netlify](https://www.netlify.com/) for frontend deployment
- [Bootstrap 4](https://getbootstrap.com/) for CSS styling
- [Docker Compose](https://docs.docker.com/compose/) for local deployment

The build specification reference for AWS CodeBuild can be seen in ```buildspec.yml```.

## 🏗️ Backend Architecture
The backend uses a simple three-layer architecture, including **controllers** (Express routes), a **service layer**, and a **data access layer** ([Mongoose ODM](https://mongoosejs.com/)). This is to abide by the principle of *separation of concerns*, and to avoid putting business logic inside the controllers.

The directory structure can be seen below:
```
.
├── config             # Environment variables
├── controllers        # Express Route controllers
│   ├── middlewares    # Express middlewares (e.g. authentication middleware)
│   └── routes         # Routes for API endpoints
├── jobs               # CRON jobs
├── loaders            # Split the server startup process into modules
├── models             # MongoDB database models
├── realm              # MongoDB Realm serverless functions
├── services           # Service classes that contain business logic
└── server.js          # Application entry point
```

## 🔒 Configuring HTTPS for the Backend Server
The backend API is configured to use HTTPS. The steps below indicate how to set up HTTPS for an AWS Elastic Beanstalk environment (mostly for my reminder, so I don't forget 😛).

1. Get an SSL certificate for the backend API server domain from [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/) (or [Let's Encrypt](https://letsencrypt.org/))
    * Need to set MX or forward email from *@SERVER_DOMAIN to your personal email
2. Create an application load balancer with a HTTPS listener on port 443 using the certificate (leave security groups as is), using the default SSL ```ELBSecurityPolicy```
3. Don't forget to set environment variables in the AWS Elastic Beanstalk environment!

## ⌨️ Usage
The repository contains a `docker-compose.yml` file for local deployment on any operating system. First, you need to create `.env` files in both the `backend` and `frontend` directories.

A sample `.env` file for `backend`:
```
PORT=5000
MONGODB_URI=mongodb://mongodb0.example.com:27017
EMAIL=example@gmail.com
PASSWORD=supersecretpassword
ORIGIN=http://localhost:3000
SECRET=supersecretkey
NODE_ENV=development
```

A sample `.env` file for `frontend`:
```
REACT_APP_SERVER=http://localhost:5000
```

To run the application, ensure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed. Then, run:
```
$ docker-compose up --build
```

## 🔮 Future Features/Improvements
* More emphasis on responsive design to better support mobile devices
* Add a cart system so users can see how much they can potentially save when purchasing on-special products
* Opt-in settings to turn off notification emails, and the ability to explicitly set personalised notification times

## 📄 License
MIT © Emmanuel Macario

## 🤓 Attribution
Made by Emmanuel Macario
