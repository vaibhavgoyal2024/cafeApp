const express = require("express");
const Object = require("../models/model");

const router = express.Router();

router.get("/", async (req,res)=>{
    try{
        const cafes = await Object.find();
        res.render("home",{
            title : "Home Page",
            data : cafes
        });
    }
    catch(error){
        console.log("Error while getting values from DataBase");
    }
});

router.get("/add", (req,res)=>{
    res.render("add_cafe",{
        title : "Add New Cafe"
    });
});

router.post("/add", async (req,res)=>{
    console.log("name : " + req.body.name);
    try{
        const cafe = new Object({
            name : req.body.name,
            phone : req.body.phone,
            reviewSum : 0,
            reviewCount : 0
        });
        await cafe.save();
        req.session.message = {
            type : "success",
            info : "You have added a new cafe successfully"
        }
        res.redirect("/");
    }
    catch{
        console.log("Error while adding a new cafe");
    }
});

router.get("/rate/:id", async (req,res)=>{
    const id = req.params.id;
    try{
        const cafe = await Object.findById(id);
        res.render("rate_cafe",{
            title : "Rate Cafe",
            cafe : cafe
        });
    }
    catch(err){
        console.log("Some error occured while getting the data of cafe");
    }
});

router.post("/rate/:id", async (req,res)=>{
    const id = req.params.id;
    const rating = parseInt(req.body.rating);
    try{
        const cafe = await Object.findById(id);
        const newSum = parseInt(cafe.reviewSum) + rating;
        const newCount = parseInt(cafe.reviewCount) + 1;
        await Object.findByIdAndUpdate(id,{
            reviewSum : newSum,
            reviewCount : newCount
        });

        req.session.message = {
            type : "success",
            info : "You have rated successfully"
        }

        res.redirect("/");
    }
    catch(err){
        console.log("Some error occured while getting the data of cafe");
    }
});

module.exports = router;