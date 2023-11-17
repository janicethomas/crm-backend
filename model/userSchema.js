const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "userName": {type:String},
    "userEmail": {type:String},
    "userPasswd": {type:String},
    "userRole": {type:String}
}, {
    collection: "users"
});

module.exports = mongoose.model("userSchema", userSchema);