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