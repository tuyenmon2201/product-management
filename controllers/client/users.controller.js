const User = require("../../models/user.model");
const Chat = require("../../models/chat.model");
const chatSocket = require("../../sockets/client/chat.socket");

module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user.id;

    // $ne: not equal

    const users = await User.find({
        _id: { $ne: userId },
        status: "active",
        deleted: false
    }).select("id avatar fullName");

    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    });
}