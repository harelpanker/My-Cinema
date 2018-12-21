var mongoose = require('mongoose');

//order
var orderSchema = mongoose.Schema({

    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show'
    },
    ticketsNumber: {
        type: Number,
        require: true
    },
    seatsOrdered: {
        type: Array,
        require: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

orderSchema.virtual('showData',{
    ref: 'Show',
    localField: 'showId',
    foreignField: '_id'
});
    
orderSchema.set('toObject', { virtuals: true });
orderSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Order", orderSchema);
