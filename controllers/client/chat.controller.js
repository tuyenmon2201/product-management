const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
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

            // Return message realtime for people
            _io.emit("SERVER_RETURN_MESSAGE", {
                userId: userId,
                content: data.content,
                fullName: fullName
            });
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