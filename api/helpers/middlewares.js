const AppError = require('./AppError');
const { checkEmail, checkLength, checkRequired } = require('./checks');


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
