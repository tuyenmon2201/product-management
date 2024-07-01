const Product = require("../../models/product.model");
const paginationHelper = require("../../helpers/pagination.helper");
const { trusted } = require("mongoose");
const systemConfig = require("../../config/system")

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    const filterStatus = [
        {
            label: "Tất cả",
            value: ""
        },
        {
            label: "Hoạt động",
            value: "active"
        },
        {
            label: "Dừng hoạt động",
            value: "inactive"
        }
    ];

    if (req.query.status) {
        find.status = req.query.status;
    }

    //Tim kiem
    let keyword = "";
    if (req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
        keyword = req.query.keyword;
    }
    //End Tim kiem

    //Phan trang
    const pagination = await paginationHelper(req, find);
    //End phan trang

    const products = await Product
        .find(find)
        .limit(pagination.limitItem)
        .skip(pagination.skip)
        .sort({
            position: "desc"
        })

    // const products = await Product.find(find);

    // console.log(products);

    res.render("admin/pages/products/index", {
        pageTitle: "Trang quản lí sản phẩm",
        products: products,
        keyword: keyword,
        filterStatus: filterStatus,
        pagination: pagination
    });
}

module.exports.changeStatus = async (req, res) => {
    const { id, statusChange } = req.params;
    // console.log(req.params);
    await Product.updateOne({
        _id: id
    }, {
        status: statusChange
    });

    req.flash('success', 'Status update success');
    res.json({
        code: 200,
    });
}

module.exports.changeMulti = async (req, res) => {
    const { status, ids } = req.body;

    // await Product.updateMany({
    //     _id: ids
    // }, {
    //     status: status
    // });

    switch (status) {
        case "active":
        case "inactive":
            await Product.updateMany({
                _id: ids
            }, {
                status: status
            });
        case "delete":
            await Product.updateMany({
                _id: ids
            }, {
                deleted: true
            });
            break;
        default:
            break;
    }

    res.json({
        code: 200,
    });
}

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({
        _id: id
    }, {
        deleted: true
    });

    req.flash('success', 'Delete item success');

    res.json({
        code: 200,
    });
}

module.exports.changePosition = async (req, res) => {
    const id = req.params.id;
    const position = req.body.position;

    await Product.updateOne({
        _id: id
    }, {
        position: position
    });

    res.json({
        code: 200,
    });
}

module.exports.create = async (req, res) => {

    res.render("admin/pages/products/create", {
        pageTitle: "Trang thêm mới sản phẩm",
    });
}

module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }
    else{
        const countProducts = await Product.countDocuments({});
        req.body.position = countProducts + 1;
    }

    const newProduct = new Product(req.body);
    await newProduct.save();

    res.redirect(`/${systemConfig.prefixAdmin}/products`);
}