const express = require('express') // Nhúng express vào dự án
const app = express() // Khởi tạo ứng dụng web sử dụng express
const port = 3000 // Cổng của website

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
//   res.send("Trang chủ");
    res.render("client/pages/home/index");
});

app.get("/products", (req, res) => {
    res.render("client/pages/products/index");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});