const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    rating: Number,
    title: String,
    comment: String
});

module.exports = mongoose.model('Review', reviewSchema);