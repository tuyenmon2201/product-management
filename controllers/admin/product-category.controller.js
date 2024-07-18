const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree.helper");

module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    });
    console.log(records);
    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: records
    });
}

module.exports.create = async (req, res) => {
    const categories = await ProductCategory.find({
        deleted: false
    });

    const newCategories = createTreeHelper(categories);

    // console.log(newCategories);

    res.render("admin/pages/products-category/create", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        categories: newCategories
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