const mongoose = require("mongoose");
// const { Schema } = mongoose;

const productScheme = new mongoose.Schema ({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
});

const Product = mongoose.model('Product', productScheme, "products");

module.exports = Product;