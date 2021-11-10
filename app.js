const express = require('express');
const mongoose = require('mongoose');
const Student = require('./studentmodel');

const app = express();

app.listen(3000,(err)=>{
    if(!err)
    {
        console.log("app connected to port 3k")
    }else{
        console.log("app failed to connect");
    }
});

const conString = "mongodb://localhost:27017/iics3";
mongoose.connect(conString,(err)=>{
    if(!err){
        console.log("database is connected to port 27017")
    }else{
        console.log("failed to connect to port 27017")
    }
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/students/insert-record",(req,res)=>{
    let stud = {name:"Cathy Garica", section: "3ISB", age:18,subjects:[{code:"ICS2609",description:"back end prog",units:3}]};
    Student.insertMany([stud],(err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            res.send("failed to insert new docs");
        }
    })
});

app.get("/students/:id",(req,res)=>{
    let condition = {_id: req.params.id};
    Student.findById(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs);
        }else{
            res.send("cant red the doc");
        }
    });
});

app.get("/students/update-student/:id",(req,res)=>{
    let condition = {_id: req.params.id};
    let action = {name:"Peter Ramos"};
    Student.update(condition, action,(err,result)=>{
        if(!err){
            res.send(result);
        }else{
            res.send("cant update");
        }
    });
});

app.get("/students/delete-student/:id",(req,res)=>{
    let condition = {_id: req.params.id};
    Student.deleteOne(condition,(err)=>{
        if(!err){
            res.send("deleted the doc");
        }else{
            res.send("Failed to delete the doc");
        }
    });
});