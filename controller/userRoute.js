const jwt = require('jsonwebtoken');
const express = require("express");
const userSchema = require("../model/userSchema");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const { createAccessJWT } = require("../helpers/jwt.helper");
const { setCookie } = require("../helpers/cookies.helper");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth_jwt");

const userRoute = new express.Router();

userRoute.post("/create-user", auth, async (req, res) => {
    
    const { userEmail, userPasswd, userRole } = req.body;

    const hashed_pass = await hashPassword(userPasswd);
    
    const newUserObj = {
        userEmail,
        userPasswd: hashed_pass,
        userRole,
    };
    
    userSchema.create(newUserObj, (err, data) => {
        if (err)
            return err;
        else
            res.json({
                message: "user created successfully",
            data});
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
    const { userEmail, userPasswd } = req.body;
    console.log("email: ",userEmail,"password:",userPasswd);

    if (!userEmail || !userPasswd) {
        return res.json({ status: "error", message: "Invalid form submission!" });
    }

    // const user = await getUserByEmail(userEmail);
    // console.log("here:",userEmail);
    const user = await userSchema.findOne({ userEmail });
    console.log("user details:",user);

    const passFromDb = user && user._id ? user.userPasswd : null;

    if (!passFromDb) {
        return res.json({ status: "error", message: "Invalid email or password!" });
    }

    const result = await comparePassword(userPasswd, passFromDb);
    console.log(result);
        
    if (!result) {
        res.json({ status: "error", message: "Invalid email or password!" });
    }
    // console.log(typeof user._id);
    // const accessJWT = await createAccessJWT(user.userEmail, `${user._id}`);
    // setCookie("jwtToken", accessJWT, 1);
    
    const accessJWT = jwt.sign({ userEmail },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '24h' }
    );
    return res.json({ status: "sucess", message: "Login successfully", accessJWT });
});

//get user profile route
userRoute.get("/", async (req, res) => {
    const_id = req.userId;

    const userProfile = await getUserById(_id);

    res.json({ user: userProfile });
});

module.exports = userRoute;