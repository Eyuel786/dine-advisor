const bcrypt = require('bcryptjs');

const User = require('../models/User');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');
const { checkEmail, checkLength, checkRequired, checkPassword } = require('./checks');


module.exports.validateRestaurant = (req, res, next) => {
    const requireds = [
        'name', 'description', 'city', 'state',
        'country', 'image', 'email'
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