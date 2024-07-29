const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    })
    .sort({position: "desc"})
    .limit(6)
    .select("-description");

    for(const item of productsFeatured){
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }

    const productsNew = await Product.find({
        deleted: false,
        status: "active"
    })
    .sort({position: "desc"})
    .limit(6)
    .select("-description");

    for(const item of productsNew){
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }

    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productsFeatured: productsFeatured,
        productsNew: productsNew
    });
}