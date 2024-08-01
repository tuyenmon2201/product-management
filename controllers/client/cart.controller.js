const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

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

    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    });
}

module.exports.addPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    const cart = await Cart.findOne({
        _id: cartId
    });

    const existProductInCart = cart.products.find(
        item => item.productId == productId
    );

    if(existProductInCart){
        await Cart.updateOne({
            _id: cartId,
            'products.productId': productId
        },
        {
            $set: {
                'products.$.quantity': quantity + existProductInCart.quantity
            }
        });
    }
    else{
        await Cart.updateOne({
            _id: cartId
        }, {
            $push: {
                products: [
                    {
                        productId: productId,
                        quantity: quantity
                    }
                ]
            }
        });
    }


    res.redirect("back");
}

module.exports.delete = async (req, res) => {

    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    await Cart.updateOne({
            _id: cartId
        },
        {
            $pull: {
                products: {
                    productId: productId
                }
            }
        }
    );

    res.redirect("back");
}