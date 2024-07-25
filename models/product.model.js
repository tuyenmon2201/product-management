const mongoose = require("mongoose");
// const { Schema } = mongoose;
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productScheme = new mongoose.Schema ({
    title: String,
    product_category_id: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    createdBy: String,
    updatedBy: String,
    deletedBy: String,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: { 
        type: String, 
        slug: "title", 
        unique: true 
    }
},  {
    timestamps: true
});

const Product = mongoose.model('Product', productScheme, "products");

module.exports = Product;