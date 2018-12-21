var mongoose = require('mongoose');

//hall
var theaterSchema = new mongoose.Schema({
    name: String,
    rows: Number,
    columans: Number
});
module.exports = mongoose.model('Theater', theaterSchema);