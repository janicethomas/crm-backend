const express = require("express");
const userSchema = require("../model/userSchema");
const userRoute = new express.Router();

userRoute.post("/create-user",(req,res)=>{
    userSchema.create(req.body, (err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
});

userRoute.get("/", (req, res) => {
    userSchema.find((err, data) => {
        if (err)
            return err;
        else
            res.json(data);
    })
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

module.exports = userRoute;