const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var hotelSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    amenities: [{ type: Schema.Types.ObjectId , ref:'Amenities' }],
    images: { type: [String] },
    createdAt: {type: Date,default: Date.now},
    updatedAt: {type: Date,default: Date.now},
    propertyClass:{type:Number,required: true},
    category:{type: String,required: true},
    hashTags:{type: [String]},
    hotelRules:{type: [String]},
    rooms: [{type: Schema.Types.ObjectId, ref: 'Room'}], // Use the imported roomSchema
    reviews: [{type: Schema.Types.ObjectId, ref: 'Reviews'}],
})

module.exports = mongoose.model('Hotel', hotelSchema)