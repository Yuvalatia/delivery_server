const mongoose = require("mongoose");

const Order_Products = mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        require: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    }
});

module.exports = mongoose.model("Order_Products", Order_Products);