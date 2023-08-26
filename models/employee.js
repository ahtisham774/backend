const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var employeeSchema = new Schema({
    
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
    },
    salary:{
        type:Number,
        required:true
    },
    designation:{
        type:String,
        required:true
    },

})

module.exports = mongoose.model('Employee', employeeSchema)