module.exports.index = (req, res) => {
    res.render("admin/pages/products/index", {
        pageTitle: "Trang quản lí sản phẩm"
    });
}