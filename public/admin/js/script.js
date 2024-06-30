// Button Status
const listButtonStatus = document.querySelectorAll("[button-status]");
if (listButtonStatus.length > 0) {
    let url = new URL(window.location.href);
    listButtonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status", status);
            }
            else {
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
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        // console.log("Chay vao day");
        // console.log(event.target.elements.keyword.value);
        const keyword = event.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
//End Form Search

//Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if (listButtonPagination.length > 0) {
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

// Button Change Status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if (listButtonChangeStatus.length > 0) {
    listButtonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("link");
            fetch(link, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        window.location.reload();
                    }
                })
            // console.log(button);
        });
    });
}

// End Button Change Status

// Check Item
const inputCheckAll = document.querySelector("input[name='checkAll']");
// console.log(inputCheckAll);
if (inputCheckAll) {
    // Bat su kien click vao nut checkAll 
    const listInputCheckItem = document.querySelectorAll("input[name='checkItem']");
    inputCheckAll.addEventListener("click", () => {
        listInputCheckItem.forEach(inputCheckItem => {
            inputCheckItem.checked = inputCheckAll.checked;
        });
    });

    // Bat su kien click vao nut checkItem
    listInputCheckItem.forEach(inputCheckItem => {
        inputCheckItem.addEventListener("click", () => {
            const listInputCheckItemChecked = document.querySelectorAll("input[name='checkItem']:checked");
            if (listInputCheckItem.length == listInputCheckItemChecked.length) {
                inputCheckAll.checked = true;
            }
            else {
                inputCheckAll.checked = false;
            }
        });
    });
}
// End Check Item

// Box Actions
const boxActions = document.querySelector("[box-actions]");
if (boxActions) {
    const button = boxActions.querySelector("button");
    button.addEventListener("click", () => {
        const select = boxActions.querySelector("select");
        const status = select.value;
        const listInputCheckItemChecked = document.querySelectorAll("input[name='checkItem']:checked");

        const ids = [];
        listInputCheckItemChecked.forEach(input => {
            ids.push(input.value);
        });

        if (status != "" && ids.length > 0) {
            const data = {
                status: status,
                ids: ids
            };

            const link = boxActions.getAttribute("box-actions");

            fetch(link, {
                method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
                .then(res => res.json)
                .then(data => {
                    if(data.code == 200){
                        window.location.reload();
                    }
                })
        }
        else {
            alert("Vui long chon checkItem va hanh dong");
        }

    });
}
// End Box Actions

// Delete record
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0){
    listButtonDelete.forEach(button => {
        button.addEventListener("click", () =>{
            const id = button.getAttribute("button-delete");
            console.log(id);

            fetch(`/admin/products/delete/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if(data.code == 200){
                        window.location.reload();
                    }
                })
        });
    });
}
// End delete record