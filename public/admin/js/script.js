// Button Status
const listButtonStatus = document.querySelectorAll("[button-status]");
if(listButtonStatus.length > 0){
    let url = new URL(window.location.href);
    listButtonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status", status);
            }
            else{
                url.searchParams.delete("status");
            }
            // console.log(status);
            // url.searchParams.set("status", status);
            // console.log(url);
            window.location.href = url.href;
        });
    });
    // Them class active mac dinh
    const statusCurrent = url.searchParams.get("status") || "";
    // console.log(statusCurrent);
    const buttonCurrent = document.querySelector(`[button-status="${statusCurrent}"]`);
    // console.log(buttonCurrent);
    buttonCurrent.classList.add("active");
}
// End Button Status