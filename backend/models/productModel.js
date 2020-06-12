// Schema for product
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
module.exports = Product;