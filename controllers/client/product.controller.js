const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    const products = await Product
    .find({
        status: "active",
        deleted: false
    })
    .sort({
        position: "desc"
    });

    for(const item of products){
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }

    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    });
}

module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    });

    console.log(product);

    if(product){
        res.render("client/pages/products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        });
    }
    else{
        res.redirect("/");
    }
}