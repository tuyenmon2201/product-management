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
        
    });
}