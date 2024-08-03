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