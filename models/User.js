const mongoose = require("mongoose");

const User = new mongoose.Schema({
    full_name: {
        type: String,
        require: true 
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model("User", User);