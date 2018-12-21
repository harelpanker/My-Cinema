var mongoose = require('mongoose');

//Mongoose config
//movie
var movieSchema = mongoose.Schema({
    title: String,
    director: String,
    description: String,
    image: String
});

module.exports = mongoose.model("Movie", movieSchema);

