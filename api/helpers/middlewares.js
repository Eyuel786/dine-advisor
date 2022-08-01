const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

const User = require('../models/User');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');
const {
    checkEmail, checkLength, checkRequired,
    checkPassword, checkRating
} = require('./checks');


module.exports.validateRestaurant = (req, res, next) => {
    const requireds = [
        'name', 'description', 'city', 'state',
        'country', 'email'
    ];

    let errorMessage = checkRequired(req.body, requireds);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    errorMessage = checkLength('description', req.body.description, 30, 180);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    ['name', 'city', 'state', 'country'].forEach(el => {
        errorMessage = checkLength(el, req.body[el], 3, 30);
        if (errorMessage) return next(new AppError(errorMessage, 400));
    });

    errorMessage = checkEmail(req.body.email);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    next();
}

module.exports.validatePerson = (req, res, next) => {
    const requireds = ['username', 'email', 'password', 'image'];
    const { username, email, password } = req.body;

    let errorMessage = checkRequired(req.body, requireds);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    errorMessage = checkLength('username', username, 3, 30);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    errorMessage = checkEmail(email);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    errorMessage = checkPassword(password);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    next();
}

module.exports.validateUser = (req, res, next) => {
    const requireds = ['username', 'password'];
    const { username, password } = req.body;

    let errorMessage = checkRequired(req.body, requireds);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    errorMessage = checkLength('username', username, 3, 30);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    errorMessage = checkPassword(password);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    next();
}

module.exports.validateReview = (req, res, next) => {
    const requireds = ['rating', 'title', 'comment'];
    const { rating, title, comment } = req.body;

    let errorMessage = checkRequired(req.body, requireds);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    errorMessage = checkRating(rating);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    errorMessage = checkLength('title', title, 3, 40);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    errorMessage = checkLength('comment', comment, 100, 300);
    if (errorMessage) return next(new AppError(errorMessage, 400));

    next();
}

module.exports.userAlreadyExists = catchAsync(async (req, res, next) => {
    const { username, email } = req.body;

    let user = await User.findOne({ username });
    if (user) return next(new AppError('User by that username already exists', 400));

    user = await User.findOne({ email });
    if (user) return next(new AppError('User by that email already exists', 400));

    next();
});

module.exports.userExists = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return next(new AppError('Invalid credentials', 400));

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return next(new AppError('Invalid credentials', 400));

    next();
});

module.exports.restaurantExists = catchAsync(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return next(new AppError('Restaurant not found', 400));

    next();
});

module.exports.reviewExists = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return next(new AppError('Review not found', 400));

    next();
});

module.exports.isAuthenticated = (req, res, next) => {
    if (!req.headers.authorization)
        return next(new AppError('You need to be authenticated', 401));

    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.currentUser = decodedToken.userId;
    next();
};

module.exports.isAuthor = catchAsync(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant.creator.equals(req.currentUser))
        return next(new AppError('You are not authorized', 403));

    next();
});

module.exports.isReviewAuthor = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId);

    if (!review.creator.equals(req.currentUser))
        return next(new AppError('You are not authorized', 403));

    console.log('Passed Authorship');

    next();
});