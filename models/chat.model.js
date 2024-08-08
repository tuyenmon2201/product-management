const mongoose = require("mongoose");
// const { Schema } = mongoose;

const chatSchema = new mongoose.Schema ({
    userId: String,
    // roomChatId: String,
    content: String,
    images: String
},  {
    timestamps: true
});

const Chat = mongoose.model("Chat", chatSchema, "chats");

module.exports = Chat;