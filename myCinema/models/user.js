var mongoose = require('mongoose');

//user
var usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    familyName: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model("User", usersSchema);