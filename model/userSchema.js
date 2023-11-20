const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userEmail: {
        type: String,
        required: [true, "Please provide an Email"],
        unique: [true, "user exists"],
    },
    userPasswd: {
        type: String,
        required: [true, "Enter your password!"],
    },
    userRole: {
        type: String,
        require: true,
        default: "user",
    },
    accessJWT: {
        token: {
            type: String,
            maxlength: 500,
            default: ''
        },
        addedAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
    },
}, {
    collection: "adarsh"
});

module.exports = mongoose.model("userSchema", userSchema);