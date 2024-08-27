var socket = io();

// Cap nhat so luong san pham trong gio hang
const listInputQuantity = document.querySelectorAll("[cart] input[name='quantity']");
if(listInputQuantity.length > 0){
    listInputQuantity.forEach(input => {
        input.addEventListener("change", () => {
            const productId = input.getAttribute("product-id");
            const quantity = parseInt(input.value);

            if(productId && quantity > 0){
                window.location.href = `/cart/update/${productId}/${quantity}`;
            }

        });
    });
}
// Het cap nhat so luong san pham trong gio hang