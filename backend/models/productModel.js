// Schema for product
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* TODO:
    1. Store Woolworths product URL
    2. Store product number
    3. Set the index, e.g. index: { unique: true }
*/

const productSchema = new Schema({
    productNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    prevPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    onSpecial: {
        type: Boolean,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    savingsAmount: {
        type: Number
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = {
    productSchema: productSchema,
    Product: Product
}