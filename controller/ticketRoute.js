const express = require("express");
const ticketSchema = require("../model/ticketSchema");
const ticketRoute = new express.Router();

ticketRoute.post("/create-ticket",(req,res)=>{
    ticketSchema.create(req.body, (err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
});

ticketRoute.get("/", (req, res) => {
    ticketSchema.find((err, data) => {
        if (err)
            return err;
        else
            res.json(data);
    })
});

ticketRoute.route("/update-ticket/:id")
    .get((req, res) => {
        ticketSchema.findById(req.params.id, (err, data) => {
            if (err)
                return err;
            else
                res.json(data);
        })
    }
    )
    .put((req,res)=>{
        ticketSchema.findByIdAndUpdate(req.params.id, {$set:req.body},
            (err,data)=>{
                if(err)
                    return err;
                else
                    res.json(data);
            })
    });

// http://localhost:4000/ticketRoute/update-ticket/652d21320d4a367f69086c38
// Axios.put(url,obj)
// Axios.put(http://localhost:4000/ticketRoute/update-ticket/652d21320d4a367f69086c38,{"name":"abc"})

ticketRoute.delete("/delete-ticket/:id",(req,res)=>{
    ticketSchema.findByIdAndRemove(req.params.id, {$set:req.body},
        (err,data)=>{
            if(err)
                return err;
            else
                res.json(data);
        })
});

module.exports = ticketRoute;