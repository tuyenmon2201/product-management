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
    const friendsList = res.locals.user.friendsList;
    const friendsListId = friendsList.map(item => item.userId);

    const users = await User.find({
        // _id: { $ne: userId },
        $and: [
            { _id: { $ne: userId } },
            { _id: { $nin: requestFriends } },
            { _id: { $nin: acceptFriends } },
            { _id: { $nin: friendsListId } },
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

module.exports.accept = async (req, res) => {
    usersSocket(req, res);
    
    const userId = res.locals.user.id;

    // $ne: not equal

    const acceptFriends = res.locals.user.acceptFriends;

    const users = await User.find({
        _id: { $in: acceptFriends },
        status: "active",
        deleted: false
    }).select("id avatar fullName");

    res.render("client/pages/users/accept", {
        pageTitle: "Lời mời đã nhận",
        users: users
    });
}

module.exports.friends = async (req, res) => {
    usersSocket(req, res);
    
    const userId = res.locals.user.id;

    // $ne: not equal

    const friendsList = res.locals.user.friendsList;
    const friendsListId = friendsList.map(item => item.userId);

    const users = await User.find({
        _id: { $in: friendsListId },
        status: "active",
        deleted: false
    }).select("id avatar fullName statusOnline");

    res.render("client/pages/users/friends", {
        pageTitle: "Danh sách bạn bè",
        users: users
    });
}