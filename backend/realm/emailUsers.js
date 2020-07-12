const nodemailer = require('nodemailer');
const User = require('../models/userModel');
require('dotenv').config();

module.exports = () => {
  /*
  const mongodbAtlas = context.services.get("mongodb-atlas");
  const users = mongodbAtlas.db("WooliesSmartSaver").collection("users");
  const nodemailer = require("nodemailer");
  */
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
     user: process.env.EMAIL,
     pass: process.env.PASSWORD
    }
  });
  
  const getRow = (product) => {
    return `<p>${product.name} previously $${product.prevPrice} now $${product.price}</p>`;
  }
  
  const fill = (specials) => {
    var all = '';
    specials.forEach((special) => {
      all += getRow(special);
    });
    return all;
  }
  
  // 
  const getMailOptions = (user, specials) => {
    var mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'A product from your list is on special!',
      html: `<!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    max-width: 500px;
                    margin: auto;
                }
                p {
                    font-size: 16px;
                    font-family: Arial, Helvetica, sans-serif;
                }
                h4 {
                  font-size: 24px;
                  font-family: Arial, Helvetica, sans-serif;
                  font-weight: medium;
                }
            </style>
        </head>
        
        <body>
            <div>
                <p>Hi ${user.username}!</p>
            </div>
            <div>
              <p>You are receiving this email because some items from 
              your product list are on special. These are listed below.</p>
            </div>
            <div>
                <h4>Specials</h4>
                ${fill(specials)}
            </div>
            <div>
              <p>Happy savings! Until next time.</p>
            </div>
        </body>
      </html>`
    }
    return mailOptions;
  }
  
  // Send notification emails for each user (if necessary)
  User.find()
    .then((users) => {
      users.forEach((user) => {

        // Retrieve the 'on special' products for a given user
        const specials = []
        user.products.forEach((product) => {
          if (!product.prevOnSpecial && product.onSpecial) {
            specials.push(product)
          }
        });
      
        // Only notify a user if they have at least one product on special
        if (specials.length > 0) {
          console.log("Emailing user since they have more than one product");
          console.log(JSON.stringify(specials[0]));
          var mailOptions = getMailOptions(user, specials);
          transporter.sendMail(mailOptions)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}