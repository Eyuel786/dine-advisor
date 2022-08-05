const mongoose = require('mongoose');
const fs = require('fs');

const Review = require('./Review');
const { Schema } = mongoose;
const catchAsync = require('../helpers/catchAsync');

const restaurantSchema = new Schema({
    name: String,
    description: String,
    image: String,
    location: String,
    geometry: {
        type: { type: String, enum: ['Point'] },
        coordinates: [String]
    },
    email: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

restaurantSchema.post('findOneAndDelete', catchAsync(async restaurant => {
    if (restaurant.reviews.length) {
        for (let reviewId of restaurant.reviews) {
            await Review.findByIdAndDelete(reviewId);
        }
    }

    if (restaurant.image) {
        fs.unlink(restaurant.image, () => { });
    }
}));

module.exports = mongoose.model('Restaurant', restaurantSchema);