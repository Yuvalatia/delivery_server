const mongoose = require("mongoose");

const Order = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    status: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Order", Order);