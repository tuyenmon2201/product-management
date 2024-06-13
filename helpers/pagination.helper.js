const Product = require("../models/product.model");

module.exports = async (req, find) => {
    //Phan trang
    const pagination = {
        currentPage: 1,
        limitItem: 4
    };

    if(req.query.page){
        pagination.currentPage = parseInt(req.query.page);
    }

    pagination.skip = (pagination.currentPage - 1) * pagination.limitItem;
    const countProducts = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProducts / pagination.limitItem);
    // console.log(totalPage);
    pagination.totalPage = totalPage;
    console.log(pagination);
    //End phan trang

    return pagination;
}