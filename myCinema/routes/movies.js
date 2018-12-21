const express = require('express');
const router = express.Router();
const moment = require('moment');
//let cache = require('../component/cache.js');

const Show = require('../models/show.js');
const Movie = require('../models/movie.js');


/*=== 3 most ordered movies ===*/
//caching for 24 hours
router.get("/big3", (req, res) => {
    let startDateTime = moment.utc().subtract(6, 'd');
    Show.aggregate([
        {
        "$match": {
            "dateTime": {$gte: new Date(startDateTime)}
        }},
        //filter 1: add movies details
        {
            $lookup:
                {
                    from: 'movies',
                    localField: 'movieId',
                    foreignField: '_id',
                    as: 'Movie2'
                }
        },
        {
            $unwind: "$Movie2"
        },
        //filter 2: group by id an sum all of the seats ordered
        {
            $group: {
                _id: '$movieId',
                count: {
                    $sum: { $size: { $objectToArray: "$orderedSeats"}}
                },
                movieDetails: { "$first": "$Movie2" }
            }
        },
        //filter 3: group by id an sum all of the seats ordered
        {
            $sort: {
                'count': -1,
            }
        },
        //filter 4: only 3 results
        {
             $limit : 3
        },
    ], function (err, result) {
        if (err) {
            return res.json(err);
        } else {
            return res.json(result);
        }
    });
});
/*=== till here 3 most ordered movies ===*/

// Movies schema
router.get("/",/*cache(50),*/ (req, res) => {
    Movie.find().then(movies => {
        res.json(movies);
    }, err => {
        console.log(err);
    });
});

router.get("/:id", (req, res) => {
    let movieId = (req.params.id);
    Movie.findById(movieId).then(Movie => {
        res.json(Movie);
    }, err => {
        console.log(err);
    });
});

router.post("/", (req, res) => {
    if (!req.body){
        return res.sendStatus(400);
    }
    
    let movie = new Movie(req.body);
    movie.save().then(newMovie => {
        console.log("Movie successfully saved");
        res.json(newMovie);
    }, err => {
        res.send(err);
    });
}); 

router.put("/", (req,res) => {
    let movie = (req.body);
    // if (movieId != movie._id){
    //     res.status(400);
    // }
    Movie.findByIdAndUpdate(movie._id,movie,
        {new: true},
        (err, mov) => {
            if(err){
               return res.status(500).send(err); 
            } else {
               return res.send(mov);
            }

        }
    )
});

router.delete("/:id", (req, res) => {
    let movieId = (req.params.id);
    Movie.findByIdAndRemove(movieId, (err, mov) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            const response = {
                message: "Movie successfully deleted",
                id: movieId
            };
            return res.status(200).send(response);
        }
    });
});

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