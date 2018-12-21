const express = require('express');
const router = express.Router();

const Order = require('../models/order.js');
const Show = require('../models/show.js');

// Orders schema
router.post("/", (req, res) => {
    let order = new Order(req.body);
    order.save().then(newOrder => {
        let orderedSeats={};
        newOrder.seatsOrdered.forEach(element => {
            orderedSeats["orderedSeats." + element[0] + "-" + element[1]] = newOrder._id;
        });
        Show.findByIdAndUpdate(req.body.showId, {'$set': orderedSeats}).then(updatedShow=>{
            console.log(updatedShow);
        });
        
        res.json(newOrder);
    }, err => {
        res.send(err);
    });
});

function checkIfOrderValid(obj){
    if ((!obj) || (!obj.ticketsNumber) || (!obj.seatsOrdered || !Array.isArray(obj.seatsOrdered)) || (!obj.showId)) {
        return false;
    }
    return true;
}

router.get("/", (req, res) => {
    Order.find().then(order => {
        res.json(order);
    }, err => {
        console.log(err);
    });
});

router.get("/:id", (req, res) => {
    let orderId = (req.params.id);
    Order.findById(orderId).populate('showInfo').then(Order => {
        res.json(Order);
    }, err => {
        console.log(err);
    });
});

router.post("/", (req, res) => {
    if (!req.body){
        return res.sendStatus(400);
    }
    
    let order = new Order(req.body);
    order.save().then(newOrder => {
        console.log("Order saved successfully");
        res.json(newOrder);
    }, err => {
        res.send(err);
    });
});

router.put("/", (req,res) => {
    let order = (req.body);
    Order.findByIdAndUpdate(order._id,order,
        {new: true},
        (err, order) => {
            if (err) return res.status(500).send(err);
            return res.send(order);
        }
    )
});

router.delete("/:id", (req, res) => {
    let orderId = (req.params.id);
    Order.findByIdAndRemove(orderId, (err, orderId) => {  
        if (err) return res.status(500).send(err);
        const response = {
            message: "Movie successfully deleted",
            id: orderId 
        };
        return res.status(200).send(response);
    });
});

router.get("/search/:term", (req, res) => {
    var regex = new RegExp(req.params["term"], 'i');
    Order.find({ title: regex }, {}).then(orders => {
        res.json(orders);
    }, err => {
        console.log(err);
    });
});

module.exports = router;