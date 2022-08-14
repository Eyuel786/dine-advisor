const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    isAuthenticated, validateReview,
    reviewExists, isReviewAuthor
} = require('../helpers/middlewares');
const reviewsController = require('../controllers/reviews.controller');
const catchAsync = require('../helpers/catchAsync');

router.post('/reviews',
    isAuthenticated,
    validateReview,
    catchAsync(reviewsController.createReview));

router.delete('/reviews/:reviewId',
    isAuthenticated,
    reviewExists,
    isReviewAuthor,
    catchAsync(reviewsController.deleteReview));

module.exports = router;