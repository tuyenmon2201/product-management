const md5 = require("md5");
const generateHelper = require("../../helpers/generate.helper");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const sendMailHelper = require("../../helpers/sendEmail.helper");

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

module.exports.logout = async (req, res) => {

    res.clearCookie("tokenUser");
    res.redirect("/user/login");
}

module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Lấy lại mật khẩu"
    });
}

module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if(!user){
        req.flash("error", "Email không tồn tại trong hệ thống");
        res.redirect("back");
        return;
    }

    const otp = generateHelper.generateRandomNumber(6);

    // Save email, OTP in database
    const forgotPasswordData = {
        email: email,
        otp: otp,
        expireAt: Date.now() + 3 * 60 * 1000
    }

    const forgotPassword = new ForgotPassword(forgotPasswordData);
    await forgotPassword.save();

    // Send OTP through email to user
    const subject = "Mã OTP lấy lại mật khẩu";
    const htmlSendMail = `Mã OTP xác thực của bạn là <b style="color: green;">${otp}</b>. Mã OTP có hiệu lực trong 3 phút. Vui lòng không cung cấp mã OTP cho người khác.`;
    sendMailHelper.sendMail(email, subject, htmlSendMail);

    res.redirect(`/user/password/otp?email=${email}`);
}

module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password", {
        pageTitle: "Xác thực OTP",
        email: email
    });
}

module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });

    if(!result){
        req.flash("error", "OTP không hợp lệ");
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email: email
    });

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");
}

module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đổi mật khẩu mới",
    });
}

module.exports.resetPasswordPatch = async (req, res) => {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne({
        tokenUser: tokenUser,
        deleted: false
    },
    {
        password: md5(password)
    });

    res.redirect("/");
}
