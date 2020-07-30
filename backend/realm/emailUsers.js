const nodemailer = require('nodemailer');
const User = require('../models/userModel');
require('dotenv').config();

module.exports = () => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
     user: process.env.EMAIL,
     pass: process.env.PASSWORD
    }
  });
  
  const getRow = (product) => {
    const src = product.imagePath.replace('large', 'small');

    return `<div class="card col-8 mb-3 shadow rounded">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="col-6">
                    <h5 class="card-title">${product.name}</h5>
                    <h6 class="card-subtitle text-muted mb-4">${product.description.split('<br>').join(' ')}</h6>
                    <p class="card-text">Was $${product.prevPrice.toFixed(2)}</p>
                    <p class="card-text">Now $${product.price.toFixed(2)}</p>
                    <p class="card-text">Save $${product.savingsAmount.toFixed(2)}</p>
                  </div>
                  <div class="col-3">
                    <img class="card-img" src="${src}" alt="Woolworths Product">
                  </div>
                </div>
              </div>
            </div>`;
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
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        </head>
        <body>
          <div class="container">
            <p class="my-4">Hi ${user.username}!</p>
      
            <p class="pl-0 mb-4 pb-4 col-6">You are receiving this email because one or more items on
              your product list is now on special. These are listed down below.</p>
            <hr class="mt-4 mb-0 py-0" />
      
            <h4 class="my-4">New Specials</h4>
            ${fill(specials)}
            <hr class="mb-4" />
            <p class="mt-4 pt-4">Happy saving, until next time!</p>
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