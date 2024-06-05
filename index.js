const express = require('express'); // Nhúng express vào dự án
require('dotenv').config();

const routeClient = require("./routes/client/index.route");

const app = express(); // Khởi tạo ứng dụng web sử dụng express
const port = process.env.PORT; // Cổng của website

app.use(express.static('public'));

app.set("views", "./views");
app.set("view engine", "pug");

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