const express = require('express') // Nhúng express vào dự án
const app = express() // Khởi tạo ứng dụng web sử dụng express
const port = 3000 // Cổng của website

app.get("/", (req, res) => {
  res.send("Trang chủ");
});

app.get("/products", (req, res) => {
  res.send("Trang danh sách sản phẩm");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});