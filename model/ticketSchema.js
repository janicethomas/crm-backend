const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    "subject": {type:String},
    "status": {type:String},
    "message": {type:String},
    "adminReply": {type:String}
}, {
    collection: "tickets"
});

module.exports = mongoose.model("ticketSchema", ticketSchema);