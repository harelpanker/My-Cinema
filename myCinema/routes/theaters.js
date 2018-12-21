const express = require('express');
const router = express.Router();

const Theater = require('../models/theater.js');

// Theaters schema

router.get("/", (req, res) => {
    Theater.find().then(theaters => {
        res.json(theaters);
    }, err => {
        console.log(err);
    });
});

router.get("/:id", (req, res) => {
    Theater.find().then(theaters => {
        res.json(theaters);
    }, err => {
        console.log(err);
    });
});

router.post("/", (req, res) => {
    if (!req.body){
        return res.sendStatus(400);
    }
    
    let theater = new Theater(req.body);
    theater.save().then(createdTheater => {
        console.log("Theater saved successfully");
        res.json(createdTheater);
    }, err => {
        res.send(err);
    });
});

router.put("/", (req,res) => {
    let theater = (req.body);
    Theater.findByIdAndUpdate(theater._id,theater,
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        (err, theater) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(theater);
        }
    )
});

router.delete("/:id", (req, res) => {

    let theaterId = (req.params.id);
    Theater.findByIdAndRemove(theaterId, (err, theaterId) => {  
        //handle any potential errors:
        if (err) return res.status(500).send(err);
        //create a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "Theater successfully deleted",
            id: theaterId 
        };
        return res.status(200).send(response);
    });
});

// Search autocomplete

router.get("/search/:term", (req, res) => {
    var regex = new RegExp(req.params["term"], 'i');
    Theater.find({ title: regex }, {}).then(theaters => {
        res.json(theaters);
        console.log(regex);
    }, err => {
        console.log(err);
    });
});

module.exports = router;