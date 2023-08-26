const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bookingSchema = new Schema({
    hotelId: {
        type: Schema.Types.ObjectId, ref: 'Hotel',
        required: true
    },
    roomId: {
        type: Schema.Types.ObjectId, ref: 'Room',
        required: true
    },

    paymentIntent: {
        type: String,
        required: true
    },
    client_id: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Booking', bookingSchema)