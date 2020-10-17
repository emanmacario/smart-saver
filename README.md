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
- [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/) for enabling HTTPS for my Elastic Beanstalk server environment, allowing backend requests to be encrypted from the application load balancer to the Amazon Elastic Compute Cloud (Amazon EC2) instance
- [Netlify](https://www.netlify.com/) for frontend deployment
- [Bootstrap 4](https://getbootstrap.com/) for CSS styling
- [Docker Compose](https://docs.docker.com/compose/) for local deployment

The build specification reference for AWS CodeBuild can be seen in ```buildspec.yml```.


## 🔒 Configuring HTTPS for backend server

1. Get an SSL certificate for the backend domain from [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/) (or [Let's Encrypt](https://letsencrypt.org/))
    * Need to set MX or forward email from *@SERVER_DOMAIN to personal email
2. Create an application load balancer with a HTTPS listener on port 443 using the certificate (leave security groups as is), using the default SSL ```ELBSecurityPolicy```
3. Don't forget to set environment variables in the AWS Elastic Beanstalk environment!


## 🔮 Future Features/Improvements
* Responsive design to support mobile devices
* Add a cart system so users can see how much they can potentially save when purchasing products


## 📄 License
MIT © Emmanuel Macario

## 🤓 Attribution
Made by Emmanuel Macario
