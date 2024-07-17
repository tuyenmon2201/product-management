const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");

module.exports.index = (req, res) => {
    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm"
    });
}

module.exports.create = (req, res) => {
    res.render("admin/pages/products-category/create", {
        pageTitle: "Thêm mới danh mục sản phẩm"
    });
}

module.exports.createPost = async (req, res) => {
    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    }
    else {
        const countCategory = await ProductCategory.countDocuments({});
        req.body.position = countCategory + 1;
    }

    const newProduct = new ProductCategory(req.body);
    await newProduct.save();

    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
}