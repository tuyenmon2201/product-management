const mongoose = require("mongoose");
// const { Schema } = mongoose;
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productCategoryScheme = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
}, {
    timestamps: true
});

const ProductCategory = mongoose.model('ProductCategory', productCategoryScheme, "products-category");

module.exports = ProductCategory;