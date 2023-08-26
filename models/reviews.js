const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: String },
  rating: { type: Number },
  reviewText: { type: String },
  reviewType:{type,String}
});

module.exports = mongoose.model('Reviews', reviewSchema)