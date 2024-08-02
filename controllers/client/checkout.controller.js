const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");

module.exports.index = async (req, res) => {

    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    });

    cart.totalPrice = 0;

    if(cart.products.length){
        for (const product of cart.products) {
            const productInfo = await Product.findOne({
                _id: product.productId
            }).select("title thumbnail slug price discountPercentage")

            productInfo.priceNew = (1 - productInfo.discountPercentage/100) * productInfo.price;
            product.productInfo = productInfo;
            product.totalPrice = productInfo.priceNew * product.quantity;
            cart.totalPrice += product.totalPrice
        }
    }

    res.render("client/pages/checkout/index", {
        pageTitle: "Đặt hàng",
        cartDetail: cart
    });
}

module.exports.orderPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;

    const orderData = {
        userInfo: userInfo,
        products: []
    };

    const cart = await Cart.findOne({
        _id: cartId
    });

    for (const item of cart.products) {
        const productInfo = await Product.findOne({
            _id: item.productId
        });

        orderData.products.push({
            productId: item.productId,
            price: productInfo.price,
            discountPercentage: productInfo.discountPercentage,
            quantity: item.quantity
        });
    }

    const order = new Order(orderData);
    await order.save();

    // update Cart to empty
    await Cart.updateOne({
        _id: cartId
    },
        {
            products: []
        }
    )

    res.redirect(`/checkout/success/${order.id}`);
}