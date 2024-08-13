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

module.exports.edit = async (req, res) => {
    const id = req.params.id;

    const category = await ProductCategory.findOne({
        _id: id,
        deleted: false
    });

    const categories = await ProductCategory.find({
        deleted: false
    });

    const newCategories = createTreeHelper(categories);

    // console.log(newCategories);
    console.log(category);

    res.render("admin/pages/products-category/edit", {
        pageTitle: "Chỉnh sửa danh mục sản phẩm",
        categories: newCategories,
        category: category
    });
}

module.exports.editPatch = async (req, res) => {

    const id = req.params.id;
    
    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    }
    else {
        const countCategory = await ProductCategory.countDocuments({});
        req.body.position = countCategory + 1;
    }

    await ProductCategory.updateOne({
        _id: id,
        deleted: false
    }, req.body);

    req.flash("success", "Cập nhật danh mục thành công");

    res.redirect(`back`);
}

module.exports.detail = async (req, res) => {

    try {
        const id = req.params.id;

        const productCategory = await ProductCategory.findOne({
            _id: id,
            deleted: false
        });

        if(productCategory){
            res.render("admin/pages/products-category/detail", {
                pageTitle: "Chi tiết danh mục",
                productCategory: productCategory
            });
        }
        else{
            res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
        }
        
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
}

module.exports.deleteCategory = async (req, res) => {
    if(res.locals.role.permission.includes("products-category_delete")){
        const id = req.params.id;

        await ProductCategory.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedBy: res.locals.account.id
        });

        req.flash('success', 'Xóa danh mục thành công!');

        res.json({
            code: 200,
        });
    }
    else{
        res.send(`403`);
    }
}

module.exports.changeStatus = async (req, res) => {
    if(res.locals.role.permission.includes("products-category_edit")){
        const { id, statusChange } = req.params;
        // console.log(req.params);
        await ProductCategory.updateOne({
            _id: id
        }, {
            status: statusChange
        });

        req.flash('success', 'Cập nhật trạng thái thành công');
        res.json({
            code: 200,
        });
    }
    else{
        res.send(`403`);
    }
}