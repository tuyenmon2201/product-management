const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status;
    }

    const products = await Product.find(find);

    console.log(products);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang quản lí sản phẩm",
        products: products
    });
}