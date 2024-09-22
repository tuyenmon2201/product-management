const RoomChat = require("../../models/rooms-chat.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;

    const listRoomChat = await RoomChat.find({
        typeRoom: "group",
        "users.userId": userId
    });

    res.render("client/pages/rooms-chat/index", {
        pageTitle: "Phòng chat",
        listRoomChat: listRoomChat
    });
}

module.exports.create = async (req, res) => {
    const friendsList = res.locals.user.friendsList;

    for (const friend of friendsList) {
        const infoFriend = await User.findOne({
            _id: friend.userId
        }).select("fullName");

        friend.fullName = infoFriend.fullName;
    }

    res.render("client/pages/rooms-chat/create", {
        pageTitle: "Tạo phòng",
        friendsList: friendsList
    });
}

module.exports.createPost = async (req, res) => {
    const title = req.body.title;
    const usersId = req.body.usersId;

    const dataRoomChat = {
        title: title,
        // avatar: String,
        typeRoom: "group",
        users: []
    }

    dataRoomChat.users.push(
        {
            userId: res.locals.user.id,
            role: "superAdmin"
        }
    );

    usersId.forEach(userId => {
        dataRoomChat.users.push(
            {
                userId: userId,
                role: "user"
            }
        )
    });

    const roomChat = new RoomChat(dataRoomChat);
    await roomChat.save();

    res.redirect(`/chat/${roomChat.id}`);

    // console.log(req.body);
    // res.send("OK");
}