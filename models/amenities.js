const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var amenitiesSchema = new Schema({
    amenitiesName: {
        type: String,
        required: true
    },
    amenitiesIcon: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
    });
module.exports = mongoose.model('Amenities', amenitiesSchema)