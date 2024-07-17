module.exports.index = (req, res) => {
    res.render("admin/pages/product-category/index", {
        pageTitle: "Danh mục sản phẩm"
    });
}