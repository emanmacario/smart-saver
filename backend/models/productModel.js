// Schema for product
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* TODO:
  1. Add URL (Do yourself)
  2. Full description (FullDescription)
  3. Instore cup string (InstoreCupString)
  4. isNew (IsNew)
  5. Last date on special
  6. Special period
  7. Available in store (InstoreIsPurchasable)
*/


const productSchema = new Schema({
  number: { 
    type: Number, required: true 
  },
  name: {
    type: String, required: true
  },
  url: {
    type: String, required: true
  },
  description: {
    type: String, required: true
  },
  prevPrice: {
    type: Number, required: true
  },
  price: {
    type: Number, required: true
  },
  prevOnSpecial: {
    type: Boolean, required: true
  },
  onSpecial: {
    type: Boolean, required: true
  },
  imagePath: {
    type: String, required: true
  },
  savingsAmount: {
    type: Number, required: true
  },
  lastOnSpecialStart: {
    type: Date, required: false
  },
  lastOnSpecialEnd: {
    type: Date, required: false
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = {
  productSchema: productSchema,
  Product: Product
}