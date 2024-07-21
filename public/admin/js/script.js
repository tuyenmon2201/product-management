
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
                    if (data.code == 200) {
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
if (listButtonDelete.length > 0) {
    listButtonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("button-delete");
            // console.log(id);

            fetch(link, {
                method: "PATCH",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        window.location.reload();
                    }
                })
        });
    });
}
// End delete record

// Change position
const listInputPosition = document.querySelectorAll("input[name=position]");
if (listInputPosition.length > 0) {
    listInputPosition.forEach(input => {
        input.addEventListener("change", () => {
            const link = input.getAttribute("link");
            const position = parseInt(input.value);
            console.log(position);
            console.log(link);
            fetch(link, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    position: position
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        });
    });
}
// End change position

// Show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    let time = showAlert.getAttribute("show-alert") || 3000;
    time = parseInt(time);

    setTimeout(() => {
        showAlert.classList.add("hidden");
    }, 3000);
}
// End show alert

// Upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
// End upload image

// Sort
const sort = document.querySelector("[sort]");
if (sort) {

    let url = new URL(window.location.href);

    const select = sort.querySelector("[sort-select]");
    select.addEventListener("change", () => {
        const [sortKey, sortValue] = select.value.split("-");
        if (sortKey && sortValue) {
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);

            window.location.href = url.href;
        }
    });

    // Add selected default for option
    const defaultSortKey = url.searchParams.get("sortKey");
    const defaultSortValue = url.searchParams.get("sortValue");

    if (defaultSortKey && defaultSortValue) {
        const optionSelected = select.querySelector(`option[value="${defaultSortKey}-${defaultSortValue}"]`);
        optionSelected.selected = true;
        // optionSelected.setAttribute("selected", true);
    }

    // Feature clear
    const buttonClear = sort.querySelector("[sort-clear]");
    if (buttonClear) {
        buttonClear.addEventListener("click", () => {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");

            window.location.href = url.href;
        });
    }
}
// End sort

// Permission
const tablePermission = document.querySelector("[table-permissions]");
if (tablePermission) {
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
        const roles = [];
        const listElementRoleId = tablePermission.querySelectorAll("[role-id]");
        for (const element of listElementRoleId) {
            const roleId = element.getAttribute("role-id");
            const role = {
                id: roleId,
                permission: []
            };

            const listInputChecked = tablePermission.querySelectorAll(`input[data-id="${roleId}"]:checked`);
            listInputChecked.forEach(input => {
                const dataName = input.getAttribute("data-name");
                role.permission.push(dataName);
            });

            roles.push(role);
        }

        const path = buttonSubmit.getAttribute("button-submit");
        fetch(path, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(roles)
        })
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    });
}
// End permission