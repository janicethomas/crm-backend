const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "userName": {type:String},
    "userEmail": {type:String},
    "userPasswd": {type:String},
    "userRole": { type: String },
    "accessJWT": {
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
    collection: "users"
});

module.exports = mongoose.model("userSchema", userSchema);