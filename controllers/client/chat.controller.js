const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const streamUpload = require("../../helpers/streamUpload.helper");

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

            const linkImages = [];

            for (const image of data.images) {
                const result = await streamUpload(image);
                linkImages.push(result.url);
            }

            chatData.images = linkImages;

            const chat = new Chat(chatData);
            await chat.save();

            // Return message realtime for people
            _io.emit("SERVER_RETURN_MESSAGE", {
                userId: userId,
                content: data.content,
                fullName: fullName,
                images: linkImages
            });
        });

        // CLIENT_SEND_TYPING
        socket.on("CLIENT_SEND_TYPING", (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                userId: userId,
                fullName: fullName,
                type: type
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