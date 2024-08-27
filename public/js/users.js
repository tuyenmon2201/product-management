// Feature send request
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0){
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            // console.log(button);
            // Add class "add" for box-user
            button.closest(".box-user").classList.add("add");
            // Send on server userIdB
            const userIdB = button.getAttribute("btn-add-friend");
            socket.emit("CLIENT_ADD_FRIEND", userIdB);
        });
    });
}
// End feature send request

// Feature cancel request
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnCancelFriend.length > 0){
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click", () => {
            // console.log(button);
            // Add class "add" for box-user
            button.closest(".box-user").classList.remove("add");
            // Send on server userIdB
            const userIdB = button.getAttribute("btn-cancel-friend");
            socket.emit("CLIENT_CANCEL_FRIEND", userIdB);
        });
    });
}
// End feature send request

// Feature refuse add friend
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriend.length > 0){
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener("click", () => {
            // console.log(button);
            
            button.closest(".box-user").classList.add("refuse");
            
            const userIdB = button.getAttribute("btn-refuse-friend");
            socket.emit("CLIENT_REFUSE_FRIEND", userIdB);
        });
    });
}
// End feature refuse add friend

// Feature accept add friend
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend.length > 0){
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener("click", () => {
            // console.log(button);
            
            button.closest(".box-user").classList.add("accepted");
            
            const userIdB = button.getAttribute("btn-accept-friend");
            socket.emit("CLIENT_ACCEPT_FRIEND", userIdB);
        });
    });
}
// End feature refuse add friend