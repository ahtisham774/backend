const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var roomSchema = new Schema({
    roomName: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    roomPrice: {
        type: Number,
        required: true
    },
    roomStatus: {
        type: String,
        required: true
    },
    roomImage: {
        type: String,
        required: true
    },
    roomDescription: {
        type: String,
        required: true
    },
    roomSize: {
        type: Number,
        required: true
    },
    roomBed: {
        type: String,
        required: true
    },
    totalPeople:{
        type: Number,
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
   
})
module.exports = mongoose.model('Room', roomSchema)