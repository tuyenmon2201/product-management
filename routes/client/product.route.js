const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/product.controller")

router.get("/", controller.index);

// router.post("/create", (req, res) => {
//     res.render("client/pages/products/create");
// });

// router.patch("/edit", (req, res) => {
//     res.render("client/pages/products/edit");
// });

// router.get("/detail", (req, res) => {
//     res.render("client/pages/products/detail");
// });

module.exports = router;