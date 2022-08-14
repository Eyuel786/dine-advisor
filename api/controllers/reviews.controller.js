const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

module.exports.createReview = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
        .populate({ path: 'reviews', populate: { path: 'creator', model: 'User' } });

    const review = new Review(req.body);
    review.creator = req.currentUser;
    restaurant.reviews.push(review);
    await restaurant.save();
    await review.save();
    res.json(restaurant.toObject({ getters: true }));
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    const restaurant = await Restaurant.findByIdAndUpdate(id,
        { $pull: { reviews: reviewId } }, { new: true, runValidators: true })
        .populate({ path: 'reviews', populate: { path: 'creator', model: 'User' } });

    await Review.findByIdAndDelete(reviewId);
    res.json(restaurant.toObject({ getters: true }));
}