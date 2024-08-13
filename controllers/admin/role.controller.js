const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
    const records = await Role.find({
        deleted: false
    });

    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records
    });
};

module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo mới nhóm quyền"
    });
};

module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();

    req.flash("success", "Thêm mới nhóm quyền thành công");

    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
};

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const record = await Role.findOne({
            _id: id,
            deleted: false
        });

        res.render("admin/pages/roles/edit", {
            pageTitle: "Chỉnh sửa nhóm quyền",
            record: record
        });
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
};

module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;

        await Role.updateOne({
            _id: id,
            deleted: false
        }, req.body);

        req.flash("success", "Cập nhật thành công!");

        res.redirect("back");
    } catch (error) {
        req.flash("success", "Cập nhật thất bại!");
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
};

module.exports.permissions = async (req, res) => {
    const records = await Role.find({
        deleted: false
    });

    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        records: records
    });
};

module.exports.permissionsPatch = async (req, res) => {
    const roles = req.body;

    for (const role of roles) {
        await Role.updateOne({
            _id: role.id,
            deleted: false
        }, {
            permission: role.permission
        });
    }
    
    res.json({
        code: 200,
        message: "Cập nhật thành công!"
    });
};

module.exports.detail = async (req, res) => {

    try {
        const id = req.params.id;

        const role = await Role.findOne({
            _id: id,
            deleted: false
        });

        // console.log(product);

        if(role){
            res.render("admin/pages/roles/detail", {
                pageTitle: "Chi tiết nhóm quyền",
                role: role
            });
        }
        else{
            res.redirect(`/${systemConfig.prefixAdmin}/roles`);
        }
        
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
}