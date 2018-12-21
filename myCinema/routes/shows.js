const express = require('express');
const moment = require('moment');
const router = express.Router();

const Show = require('../models/show.js');


router.get("/", (req, res) => {
    Show.find().populate('movieData').populate('theaterData').then(shows => {
        res.json(shows);
    }, err => {
        console.log(err);
    });
});

router.get("/:id", (req, res) => {
    let showId = (req.params.id);
    Show.findById(showId).populate('movieData').populate('theaterData').then(show => {
        res.json(show);
    }, err => {
        console.log(err);
    });
});


router.get("/movie/:movieid", (req, res) => {
    let paramMovieId = (req.params.movieid);
    Show.find({_MovieId: paramMovieId},{}).populate('movieData').populate('theaterData').then(show => {
        res.json(show);
    }, err => {
        console.log(err);
    });
});


router.get("/theater/:theaterid", (req, res) => {
    let paramTheaterId = (req.params.theaterid);
    Show.find({_MovieId: paramTheaterId},{}).populate('theaterData').then(show => {
        res.json(show);
    }, err => {
        console.log(err);
    });
});

router.put("/", (req,res) => {
    let show = (req.body);
    Show.findByIdAndUpdate(show._id,show,
        {new: true},
        (err, show) => {
            if (err) return res.status(500).send(err);
            return res.send(show);
        }
    )
});

router.delete("/:id", (req, res) => {
    let showId = (req.params.id);
    Show.findByIdAndRemove(showId, (err, showId) => {  
        //handle any potential errors:
        if (err) return res.status(500).send(err);
        //create a simple object to send back with a message and the id of the document that was removed
        const response = {
            message: "Show successfully deleted",
            id: showId 
        };
        return res.status(200).send(response);
    });
});

router.post("/", (req, res) => {
    if (!req.body)
        return res.sendStatus(400);
    
    let show = new Show(req.body);
    show.save().then(newShow => {
        console.log("Show saved successfully");
        res.json(newShow);
    }, err => {
        res.send(err);
    });
});

//
router.get("/schedule/:movieid", (req, res) => {
    let paramMovieId = (req.params.movieid);
    //console.log(moment(currentDate, 'LLLL', 'he').format('dddd'));
    let dateRange=[];
    
    for (i = 0; i < 7; i++){
        dateRange.push(moment().add(i,'d').format('YYYY-MM-DD'));
    }
    console.log(dateRange);
    
    // date objects are being saved in the DB in UTC timezone. we need to change it back to local time.
    // we can do it using 'aggregation expressions':
    // see - https://docs.mongodb.com/manual/reference/operator/query/expr/index.html
    // see - https://docs.mongodb.com/manual/reference/operator/aggregation/setIsSubset/
    Show.find({movieId: paramMovieId, '$expr': {
        '$setIsSubset': [
            [ { '$dateToString': { 
                    'format': '%Y-%m-%d',
                    'date': '$dateTime',
                    'timezone': 'Asia/Jerusalem'
            } } ],dateRange
        ]
    }},{}).populate('movieData').populate('theaterData').then(show => {
        let showRespond={};
        show.sort((a,b)=>{
            //sorting the array of objects according to date and time. earlier first.
            return a.dateTime - b.dateTime;
          });
        //res.json(show);
        //saving it as as a array of object so i could *ngfor the results in angular  
        show.forEach(element => {
            let date = moment(element.dateTime).format('YYYY-MM-DD');
            let time = moment(element.dateTime).format('HH:mm');

            if (!showRespond.hasOwnProperty(date)){
                if (!moment(element.dateTime).isBefore(moment())){
                    showRespond[date]=[];
                    let obj = {};
                    obj[time] = element._id;
                    showRespond[date].push(obj);
                }
            } else {
                    let obj = {};
                    obj[time] = element._id;
                    showRespond[date].push(obj);                
            } 
        });

        //saving it as as a array of object so i could *ngfor the results in angular
        let newRespond = [];
        for (let key in showRespond){
            let obj={};
            obj[key]=showRespond[key];
            newRespond.push(obj);
        }

        console.log(showRespond);
        res.json(newRespond);
    }, err => {
        console.log(err);
    });
});
//
// Search autocomplete

router.get("/search/:term", (req, res) => {
    var regex = new RegExp(req.params["term"], 'i');
    Movie.find({ title: regex }, {}).then(movies => {
        res.json(movies);
        console.log(regex);
    }, err => {
        console.log(err);
    });
});

module.exports = router;
