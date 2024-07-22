const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/account.controller");
const multer = require('multer');
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
    "/create",
    upload.single('avatar'),
    uploadCloud.uploadSingle,
    controller.createPost
);

module.exports = router;