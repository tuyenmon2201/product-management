const User = require("../../models/user.model");
const Chat = require("../../models/chat.model");
const chatSocket = require("../../sockets/client/chat.socket");
const usersSocket = require("../../sockets/client/users.socket");

module.exports.notFriend = async (req, res) => {
    usersSocket(req, res);
    
    const userId = res.locals.user.id;

    // $ne: not equal

    const requestFriends = res.locals.user.requestFriends;
    const acceptFriends = res.locals.user.acceptFriends;

    const users = await User.find({
        // _id: { $ne: userId },
        $and: [
            { _id: { $ne: userId } },
            { _id: { $nin: requestFriends } },
            { _id: { $nin: acceptFriends } },
        ],
        status: "active",
        deleted: false
    }).select("id avatar fullName");

    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    });
}

module.exports.request = async (req, res) => {
    usersSocket(req, res);
    
    const userId = res.locals.user.id;

    // $ne: not equal

    const requestFriends = res.locals.user.requestFriends;

    const users = await User.find({
        _id: { $in: requestFriends },
        status: "active",
        deleted: false
    }).select("id avatar fullName");

    res.render("client/pages/users/request", {
        pageTitle: "Lời mời đã gửi",
        users: users
    });
}