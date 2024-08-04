const md5 = require("md5");
const generateHelper = require("../../helpers/generate.helper");
const User = require("../../models/user.model");

module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng kí tài khoản"
    });
}

module.exports.registerPost = async (req, res) => {
    const existUser = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if(existUser){
        req.flash("error", "Email đã tồn tại");
        res.redirect("back");
        return;
    }

    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30)
    }

    const user = new User(userData);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);
    req.flash("success", "Đăng ký tài khoản thành công!");

    res.redirect("/");
}

module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản"
    });
}

module.exports.loginPost = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if(!user){
        req.flash("error", "Email đã tồn tại");
        res.redirect("back");
        return;
    }

    if(md5(req.body.password) != user.password){
        req.flash("error", "Sai mật khẩu");
        res.redirect("back");
        return;
    }

    if(user.status != "active"){
        req.flash("error", "Tài khoản đang bị khóa");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);
    req.flash("success", "Đăng nhập tài khoản thành công!");

    res.redirect("/");
}