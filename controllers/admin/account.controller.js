const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const md5 = require('md5');
const generateHelper = require("../../helpers/generate.helper");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
    const records = await Account.find({
        deleted: false
    });

    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });
        record.roleTitle = role.title;
    }

    res.render("admin/pages/accounts/index", {
        pageTitle: "Tài khoản admin",
        records: records
    });
}

module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    }).select("title");

    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo tài khoản admin",
        roles: roles
    });
}

module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password);
    req.body.token = generateHelper.generateRandomString(30);
    const account = new Account(req.body);
    await account.save();

    // console.log(req.body);
    // res.send("OK");
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

module.exports.edit = async (req, res) => {

    const id = req.params.id;
    const account = await Account.findOne({
        _id: id,
        deleted: false
    });

    const roles = await Role.find({
        deleted: false
    }).select("title");

    res.render("admin/pages/accounts/edit", {
        pageTitle: "Chỉnh sửa tài khoản admin",
        roles: roles,
        account: account
    });
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    if(req.body.password == ""){
        delete req.body.password;
    }
    else{
        req.body.password = md5(req.body.password);
    }

    await Account.updateOne({
        _id: id,
        deleted: false
    }, req.body);

    req.flash("success", "Cập nhật tài khoản thành công!");

    res.redirect("back");

}

module.exports.detail = async (req, res) => {

    try {
        const id = req.params.id;

        const account = await Account.findOne({
            _id: id,
            deleted: false
        });

        // console.log(product);

        if(account){
            res.render("admin/pages/accounts/detail", {
                pageTitle: "Chi tiết tài khoản admin",
                account: account
            });
        }
        else{
            res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
        }
        
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
}