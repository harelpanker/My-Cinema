const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Users schema
router.get("/", (req, res) => {
    User.find().then(user => {
        res.json(user);
    }, err => {
        console.log(err);
    });
});

router.get("/:id", (req, res) => {
    let userId = (req.params.id);
    User.findById(userId).then(User => {
        res.json(User);
    }, err => {
        console.log(err);
    });
});

router.post("/", (req, res) => {
    if (!req.body)
        return res.sendStatus(400);
    
    let user = new User(req.body);
    user.save().then(newUser => {
        console.log("User saved successfully");
        res.json(newUser);
    }, err => {
        res.send(err);
    });
});

router.put("/", (req,res) => {
    let user = (req.body);
    User.findByIdAndUpdate(user._id,user,
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        (err, user) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(user);
        }
    )
});

router.delete("/:id", (req, res) => {

    let userId = (req.params.id);
    User.findByIdAndRemove(userId, (err, userId) => {  
        //handle any potential errors:
        if (err) return res.status(500).send(err);
        //create a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "user successfully deleted",
            id: userId 
        };
        return res.status(200).send(response);
    });
});


router.get("/search/:term", (req, res) => {
    var regex = new RegExp(req.params["term"], 'i');
    User.find({ title: regex }, {}).then(user => {
        res.json(user);
        console.log(regex);
    }, err => {
        console.log(err);
    });
});

module.exports = router;
