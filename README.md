# **Product Management**

## 📝 **Introduction**

This project is a Product Management System built using Server-Side Rendering (SSR) with JavaScript. It utilizes MongoDB Atlas for database storage and PUG for rendering the user interface. The framework used is ExpressJS, combined with various NPM libraries. Additionally, the project features a chat system and friendship management using Socket.IO.

## 📌 **Features**

🔹 **Backend Features**

- Dashboard Page: Displays account information.

- Product List Page:

  - Search products.

  -  Filter by status.

  -  Sort by position, price, and title.

  -  Change the status of single or multiple products.

  -  Change product positions.

  -  Create, edit, and delete products.

  -  Pagination.

- Product Category Page:

  -  Create, edit, and delete categories.

- Role Management Page:

  -  Create, edit, and delete roles.

- Permission Management Page:

  -  View, create, edit, and delete permissions (products, categories roles, etc.) for admins and authorized users.

- Admin Account Page:

  -  Display, create, edit, and delete admin accounts.

- General Settings:

  -  Configure website name, phone, logo, and other settings.

🔹 **Frontend Features**

- Home Page: Displays all products.

- Product Page:

  -  Show featured products and latest products.

  -  Filter products by category.

- Cart Page:

  -  Add products to the cart.

  -  Place orders.

  -  Remove products from the cart.

- Account Information Page:

  -  Display user account details (name, email, etc.).

- Friend Management Page:

  -  Show user list and friend list.

  -  Manage sent and received friend invitations.

- Chat Page:

  -  One-on-one and group chat.

## ⚙️ **Installation and Setup**

📌 **Prerequisites**

Ensure you have the following installed:

- Node.js (Latest LTS version recommended)

- MongoDB Atlas (or local MongoDB instance)

- Git

📌 **Clone Repository**

git clone https://github.com/tuyenmon2201/product-management.git
cd product-management

📌 **Install Dependencies**

npm install

📌 **Environment Configuration**

Create a .env file in the root directory and configure the following variables:

- PORT=3000
- MONGODB_URI=your_mongodb_atlas_connection_string
- SOCKET_IO_PORT=your_socket_io_port

📌 **Start the Application**

🔹 Development Mode

- npm run dev

🔹 Production Mode

- npm start

📌 **Access the Application**

- Open http://localhost:3000/ in your browser.

🛠️ **Technologies Used**

- ExpressJS - Web framework for Node.js

- MongoDB Atlas - Cloud database storage

- PUG - Template engine for UI rendering

- Socket.IO - Real-time chat functionality

- Mongoose - ODM for MongoDB

- Dotenv - Environment variable management

🤝 **Contributing**

1. Fork the repository.

2. Create a new branch: git checkout -b feature-name

3. Commit your changes: git commit -m "Add some feature"

4. Push to the branch: git push origin feature-name

5. Submit a Pull Request.