
const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./controller/userRoute")
const ticketRoute = require("./controller/ticketRoute")
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const auth = require("./middlewares/auth_jwt");
require('dotenv').config();

//setting up mongodb atlas using moongoose
mongoose.set("strictQuery", true)
mongoose.connect("mongodb+srv://adarsh:Gm4ErmUBCnbx3i1m@cluster0.v9txswe.mongodb.net/?retryWrites=true&w=majority");
var db = mongoose.connection;
db.on("open", ()=>console.log("Connected to DB"));
db.on("error", () => console.log("error occured"));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// seeting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//handle cors error
app.use(cors());

//Load Routers
app.use("/userRoute", userRoute)
app.use("/ticketRoute", ticketRoute);


app.listen(4000, ()=>{
    console.log("Server connected to 4000");
})