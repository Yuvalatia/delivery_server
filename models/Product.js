const mongoose = require("mongoose");

const Product = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true 
    }
});

module.exports = mongoose.model("Product", Product);