const express = require('express'); // Nhúng express vào dự án
require('dotenv').config();
const bodyParser = require('body-parser');

const database = require("./config/database");
database.connect();

const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");
const systemConfig = require("./config/system");

const app = express(); // Khởi tạo ứng dụng web sử dụng express
const port = process.env.PORT; // Cổng của website

// parser application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.set("views", "./views");
app.set("view engine", "pug");

app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin.index(app);
routeClient.index(app);

// app.get("/", (req, res) => {
// //   res.send("Trang chủ");
//     res.render("client/pages/home/index");
// });

// app.get("/products", (req, res) => {
//     res.render("client/pages/products/index");
// });

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});