const streamUpload = require("../../helpers/streamUpload.helper");
const User = require("../../models/user.model");

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
        
    });
}