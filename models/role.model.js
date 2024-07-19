const mongoose = require("mongoose");
// const { Schema } = mongoose;

const roleScheme = new mongoose.Schema ({
    title: String,
    description: String,
    permission: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    }
},  {
    timestamps: true
});

const Role = mongoose.model('Role', roleScheme, "roles");

module.exports = Role;