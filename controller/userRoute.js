const express = require("express");
const passport = require('./auth');
const userSchema = require("../model/userSchema");
const { getUserByEmail, getUserById } = require("../model/User.model")
import { setCookie} from "../helpers/cookies.helper";


const userRoute = new express.Router();

userRoute.post("/create-user",(req,res)=>{
    userSchema.create(req.body, (err, data) => {
        if (err)
            return err;
        else
            res.json(data);
    });
});

userRoute.route("/update-user/:id")
    .get((req, res) => {
        userSchema.findById(req.params.id, (err, data) => {
            if (err)
                return err;
            else
                res.json(data);
        })
    }
    )
    .put((req,res)=>{
        userSchema.findByIdAndUpdate(req.params.id, {$set:req.body},
            (err,data)=>{
                if(err)
                    return err;
                else
                    res.json(data);
            })
    });

// http://localhost:4000/userRoute/update-user/652d21320d4a367f69086c38
// Axios.put(url,obj)
// Axios.put(http://localhost:4000/userRoute/update-user/652d21320d4a367f69086c38,{"name":"abc"})

userRoute.delete("/delete-user/:id",(req,res)=>{
    userSchema.findByIdAndRemove(req.params.id, {$set:req.body},
        (err,data)=>{
            if(err)
                return err;
            else
                res.json(data);
        })
});


userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        if (!email || !password) {
            return res.json({ status: "error", message: "Invalid form submission!" });
        }

        const user = await getUserByEmail(email);
        //console.log(user);

        const passFromDb = user && user._id ? user.userPasswd : null;

        if (!passFromDb) {
            return res.json({ status: "error", message: "Invalid email or password!" });
        }

        if (password !== passFromDb) {
            return res.json({ status: "error", message: "Invalid email or password!" });
        }

        const accessJWT = await createAccessJWT(user.email, `$(user._id`);

        setCookie("jwtToken", accessJWT, 1);
        res.json({ status: "sucess", message: "Login successfully", accessJWT });
    }
});

//get user profile route
userRoute.get("/", auth, async (req, res) => {
    const_id = req.userId;

    const userProfile = await getUserById(_id);

    res.json({ user: userProfile });
});

module.exports = userRoute;