const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: {
        type: String,
        required: true
    },
    profileImage:{
        type: String,
    },
    password: { type: String, required: true },
   
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)