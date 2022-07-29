const mongoose = require('mongoose');
const {Schema} = mongoose;


const reviewSchema = new Schema({
    rating: Number,
    title: String,
    comment: String,
    creator: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Review', reviewSchema);