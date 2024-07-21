const mongoose = require("mongoose");
// const { Schema } = mongoose;

const accountScheme = new mongoose.Schema ({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    token: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    }
},  {
    timestamps: true
});

const Account = mongoose.model("Account", accountScheme, "accounts");

module.exports = Account;