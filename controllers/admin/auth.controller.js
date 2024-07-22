const md5 = require("md5");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");

module.exports.login = (req, res) => {
    res.render("admin/pages/auth/login", {
        pageTitle: "Đăng nhập"
    });
}

module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const account = await Account.findOne({
        email: email,
        deleted: false
    });

    if(!account){
        req.flash("error", "Email không tồn tại trong hệ thống!");
        res.redirect("back");
        return;
    }

    if(md5(password) != account.password){
        req.flash("error", "Sai mật khẩu");
        res.redirect("back");
        return;
    }

    if(account.status != "active"){
        req.flash("error", "Tài khoản đang bị khóa!");
        res.redirect("back");
        return;
    }

    res.cookie("token", account.token);

    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);

    // console.log(req.body);
    // res.send("OK");
}

module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}