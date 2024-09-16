const streamUpload = require("../../helpers/streamUpload.helper");
const Chat = require("../../models/chat.model");

module.exports = (req, res) => {

    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    const roomChatId = req.params.roomChatId;
    
    _io.once('connection', (socket) => {
        socket.join(roomChatId);

        // console.log('a user connected', socket.id);
        // CLIENT_SEND_MESSAGE
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            const chatData = {
                userId: userId,
                content: data.content,
                roomChatId: roomChatId
            };

            const linkImages = [];

            for (const image of data.images) {
                const result = await streamUpload(image);
                linkImages.push(result.url);
            }

            chatData.images = linkImages;

            const chat = new Chat(chatData);
            await chat.save();

            // Return message realtime for people
            _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
                userId: userId,
                content: data.content,
                fullName: fullName,
                images: linkImages
            });
        });

        // CLIENT_SEND_TYPING
        socket.on("CLIENT_SEND_TYPING", (type) => {
            socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
                userId: userId,
                fullName: fullName,
                type: type
            });
        });
    });
}