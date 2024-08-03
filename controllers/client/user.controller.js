const md5 = require("md5");
const generateHelper = require("../../helpers/generate.helper");

module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng kí tài khoản"
    });
}

module.exports.registerPost = async (req, res) => {
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30)
    }

    res.send("Ok");
}