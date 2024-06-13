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

//Form Search
const formSearch = document.querySelector("[form-search]");
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        // console.log("Chay vao day");
        // console.log(event.target.elements.keyword.value);
        const keyword = event.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword", keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
//End Form Search

//Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0){
    let url = new URL(window.location.href);
    listButtonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            // console.log(button);
            window.location.href = url.href;
        });
    });
}
//End Pagination