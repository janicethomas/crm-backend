
const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./controller/userRoute")
const ticketRoute = require("./controller/ticketRoute")
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();

mongoose.set("strictQuery", true)
mongoose.connect("mongodb+srv://crm1:crm1@cluster0.lz1zczf.mongodb.net/crm-db");
var db = mongoose.connection;
db.on("open", ()=>console.log("Connected to DB"));
db.on("error", ()=>console.log("error occured"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

app.use("/userRoute", userRoute)
app.use("/ticketRoute", ticketRoute)

app.listen(4000, ()=>{
    console.log("Server connected to 4000");
})