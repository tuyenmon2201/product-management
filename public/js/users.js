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

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    const badgeUsersAccept = document.querySelector(`[badge-users-accept="${data.userId}"]`);
    if(badgeUsersAccept){
        badgeUsersAccept.innerHTML = data.length;
    }
});
// END_SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    const dataUsersAccept = document.querySelector(`[data-users-accept="${data.userIdB}"]`);
    if(dataUsersAccept){
        const boxUserA = document.createElement("div");
        boxUserA.classList.add("col-6");
        boxUserA.setAttribute("user-id", data.infoA._id);
        boxUserA.innerHTML = `
            <div class="box-user">
                <div class="inner-avatar">
                    <img src="https://robohash.org/hicveldicta.png" alt="${data.infoA.fullName}">
                </div>
                <div class="inner-info">
                    <div class="inner-name">${data.infoA.fullName}</div>
                    <div class="inner-buttons">
                        <button 
                            class="btn btn-sm btn-primary mr-1" 
                            btn-accept-friend="${data.infoA._id}"
                        >
                            Chấp nhận
                        </button>
                        <button 
                            class="btn btn-sm btn-secondary mr-1" 
                            btn-refuse-friend="${data.infoA._id}"
                        >
                            Xóa
                        </button>
                        <button 
                            class="btn btn-sm btn-secondary mr-1" 
                            btn-deleted-friend="" disabled=""
                        >
                            Đã xóa
                        </button>
                        <button 
                            class="btn btn-sm btn-primary mr-1" 
                            btn-accepted-friend="" disabled=""
                        >
                            Đã chấp nhận
                        </button>
                    </div>
                </div>
            </div>
        `;

        dataUsersAccept.appendChild(boxUserA);

        const buttonRefuse = boxUserA.querySelector("[btn-refuse-friend]");

        buttonRefuse.addEventListener("click", () => {
            // console.log(button);
            
            buttonRefuse.closest(".box-user").classList.add("refuse");
            
            const userIdA = buttonRefuse.getAttribute("btn-refuse-friend");
            socket.emit("CLIENT_REFUSE_FRIEND", userIdA);
        });

        const buttonAccept = boxUserA.querySelector("[btn-accept-friend]");

        buttonAccept.addEventListener("click", () => {
            // console.log(button);
            
            buttonAccept.closest(".box-user").classList.add("accepted");
            
            const userIdA = buttonAccept.getAttribute("btn-accept-friend");
            socket.emit("CLIENT_ACCEPT_FRIEND", userIdA);
        });
    }
});
// END_SERVER_RETURN_INFO_ACCEPT_FRIEND

// SERVER_RETURN_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_ID_CANCEL_FRIEND", (data) => {
    const dataUsersAccept = document.querySelector(`[data-users-accept="${data.userIdB}"]`);
    if(dataUsersAccept){
        const boxUserA = dataUsersAccept.querySelector(`[user-id="${data.userIdA}"]`);
        if(boxUserA){
            dataUsersAccept.removeChild(boxUserA);
        }
    }
})
// END SERVER_RETURN_ID_CANCEL_FRIEND