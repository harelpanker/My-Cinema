var mongoose = require('mongoose');

//show
var showSchema = mongoose.Schema({

    theaterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater'
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    dateTime: {
        type: Date,
        required: true
    },
    orderedSeats: {
        type: Object,
        default: {}
    }
},{minimize: false});

showSchema.virtual('theaterData',{
    ref: 'Theater',
    localField: 'theaterId',
    foreignField: '_id'
});

showSchema.virtual('movieData',{
    ref: 'Movie',
    localField: 'movieId',
    foreignField: '_id'
});    
    
showSchema.set('toObject', { virtuals: true });
showSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Show', showSchema);