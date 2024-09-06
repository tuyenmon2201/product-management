const streamUpload = require("../../helpers/streamUpload.helper");
const User = require("../../models/user.model");
const RoomChat = require("../../models/rooms-chat.model");

module.exports = (req, res) => {

    const userIdA = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    
    _io.once("connection", (socket) => {
        socket.on("CLIENT_ADD_FRIEND", async (userIdB) => {
            // Add id of A for acceptFriend of B
            const existUserAInB = await User.findOne({
                _id: userIdB,
                acceptFriends: userIdA
            });

            if(!existUserAInB){
                await User.updateOne({
                    _id: userIdB
                }, {
                    $push: {
                        acceptFriends: userIdA
                    }
                });
            }

            // Add id of B for requestFriend of A
            const existUserBInA = await User.findOne({
                _id: userIdA,
                requestFriends: userIdB
            });

            if(!existUserBInA){
                await User.updateOne({
                    _id: userIdA
                }, {
                    $push: {
                        requestFriends: userIdB
                    }
                });
            }

            const infoB = await User.findOne({
                _id: userIdB
            });

            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                length: infoB.acceptFriends.length,
                userId: userIdB
            });

            const infoA = await User.findOne({
                _id: userIdA
            }).select("id fullName avatar");

            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
                userIdB: userIdB,
                infoA: infoA
            });

            socket.broadcast.emit("SERVER_RETURN_ID_ACCEPT_FRIEND", {
                userIdA: userIdA,
                userIdB: userIdB
            });
        });

        socket.on("CLIENT_CANCEL_FRIEND", async (userIdB) => {
            // Remove id of A in acceptFriend of B
            const existUserAInB = await User.findOne({
                _id: userIdB,
                acceptFriends: userIdA
            });

            if(existUserAInB){
                await User.updateOne({
                    _id: userIdB
                }, {
                    $pull: {
                        acceptFriends: userIdA
                    }
                });
            }

            // Remove id of B in requestFriend of A
            const existUserBInA = await User.findOne({
                _id: userIdA,
                requestFriends: userIdB
            });

            if(existUserBInA){
                await User.updateOne({
                    _id: userIdA
                }, {
                    $pull: {
                        requestFriends: userIdB
                    }
                });
            }

            const infoB = await User.findOne({
                _id: userIdB
            });

            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                length: infoB.acceptFriends.length,
                userId: userIdB
            });

            socket.broadcast.emit("SERVER_RETURN_ID_CANCEL_FRIEND", {
                userIdA: userIdA,
                userIdB: userIdB
            });

        });

        socket.on("CLIENT_REFUSE_FRIEND", async (userIdB) => {
            // Remove id of B in acceptFriend of A
            const existUserBInA = await User.findOne({
                _id: userIdA,
                acceptFriends: userIdB
            });

            if(existUserBInA){
                await User.updateOne({
                    _id: userIdA
                }, {
                    $pull: {
                        acceptFriends: userIdB
                    }
                });
            }

            // Remove id of A in requestFriend of B
            const existUserAInB = await User.findOne({
                _id: userIdB,
                requestFriends: userIdA
            });

            if(existUserAInB){
                await User.updateOne({
                    _id: userIdB
                }, {
                    $pull: {
                        requestFriends: userIdA
                    }
                });
            }
        });

        socket.on("CLIENT_ACCEPT_FRIEND", async (userIdB) => {
            try {
                // Create room chat
                const roomChat = new RoomChat({
                    typeRoom: "friend",
                    users: [
                        {
                            userId: userIdA,
                            role: "superAdmin"
                        },
                        {
                            userId: userIdB,
                            role: "superAdmin"
                        }
                    ]
                });

                await roomChat.save();

                // Remove id of B in acceptFriend of A
                const existUserBInA = await User.findOne({
                    _id: userIdA,
                    acceptFriends: userIdB
                });

                if(existUserBInA){
                    await User.updateOne({
                        _id: userIdA
                    }, {
                        $push: {
                            friendsList: {
                                userId: userIdB,
                                roomChatId: roomChat.id
                            }
                        },
                        $pull: {
                            acceptFriends: userIdB
                        }
                    });
                }

                // Remove id of A in requestFriend of B
                const existUserAInB = await User.findOne({
                    _id: userIdB,
                    requestFriends: userIdA
                });

                if(existUserAInB){
                    await User.updateOne({
                        _id: userIdB
                    }, {
                        $push: {
                            friendsList: {
                                userId: userIdA,
                                roomChatId: roomChat.id
                            }
                        },
                        $pull: {
                            requestFriends: userIdA
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }

        });
        
    });
}