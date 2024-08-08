const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    _io.once('connection', (socket) => {
        // console.log('a user connected', socket.id);
        // CLIENT_SEND_MESSAGE
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            const chatData = {
                userId: userId,
                content: data.content
            }

            const chat = new Chat(chatData);
            await chat.save();
        });
    });

    const chats = await Chat.find({});

    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.userId
        });

        chat.fullName = infoUser.fullName;

    }

    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats
    });
}