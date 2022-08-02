if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const app = express();

const Restaurant = require('./models/Restaurant');
const Review = require('./models/Review');
const User = require('./models/User');
const AppError = require('./helpers/AppError');
const catchAsync = require('./helpers/catchAsync');
const imageUpload = require('./helpers/imageUpload');
const {
    validateRestaurant, validatePerson, validateUser, validateReview,
    restaurantExists, reviewExists, userExists, userAlreadyExists,
    isAuthenticated, isAuthor, isReviewAuthor
} = require('./helpers/middlewares');

mongoose.connect('mongodb://localhost:27017/dine-advisor-db')
    .then(res => console.log('Database connected'))
    .catch(err => console.log('Could not connect to Database'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads/images', express.static(path.join(__dirname, '/uploads/images')));


app.get('/restaurants', catchAsync(async (req, res) => {
    const restaurants = await Restaurant.find({})
        .populate({ path: 'reviews', populate: { path: 'creator', model: 'User' } });
    res.json(restaurants.map(r => r.toObject({ getters: true })));
}));

app.post('/restaurants',
    isAuthenticated,
    imageUpload.single('image'),
    validateRestaurant,
    catchAsync(async (req, res, err) => {

        const { name, description, city, state, country, email } = req.body;
        const restaurant = new Restaurant({ name, description, city, state, country, email });
        restaurant.creator = req.currentUser;
        restaurant.image = req.file.path;
        await restaurant.save();
        res.status(201).json(restaurant.toObject({ getters: true }));
    }));

app.get('/restaurants/:id',
    restaurantExists,
    catchAsync(async (req, res) => {

        const restaurant = await Restaurant.findById(req.params.id)
            .populate({ path: 'reviews', populate: { path: 'creator', model: 'user' } });
        res.json(restaurant.toObject({ getters: true }));
    }));

app.patch('/restaurants/:id',
    isAuthenticated,
    restaurantExists,
    isAuthor,
    imageUpload.single('image'),
    validateRestaurant,
    catchAsync(async (req, res) => {

        const { name, description, city, state, country, email } = req.body;
        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { name, description, city, state, country, email },
            { new: true, runValidators: true })
            .populate({ path: 'reviews', populate: { path: 'creator', model: 'User' } });

        if (req.file) {
            fs.unlink(restaurant.image, () => { });
            restaurant.image = req.file.path;
            await restaurant.save();
        }
        res.json(restaurant.toObject({ getters: true }));
    }));

app.delete('/restaurants/:id',
    isAuthenticated,
    restaurantExists,
    isAuthor,
    catchAsync(async (req, res) => {

        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ message: 'Restaurant deleted' });
    }));

// REVIEWS

app.post('/restaurants/:id/reviews',
    isAuthenticated,
    validateReview,
    catchAsync(async (req, res) => {

        const restaurant = await Restaurant.findById(req.params.id)
            .populate({ path: 'reviews', populate: { path: 'creator', model: 'User' } });

        const review = new Review(req.body);
        review.creator = req.currentUser;
        restaurant.reviews.push(review);
        await restaurant.save();
        await review.save();
        res.json(restaurant.toObject({ getters: true }));
    }));

app.delete('/restaurants/:id/reviews/:reviewId',
    isAuthenticated,
    reviewExists,
    isReviewAuthor,
    catchAsync(async (req, res) => {

        const { id, reviewId } = req.params;
        const restaurant = await Restaurant.findByIdAndUpdate(id,
            { $pull: { reviews: reviewId } }, { new: true, runValidators: true })
            .populate({ path: 'reviews', populate: { path: 'creator', model: 'User' } });

        await Review.findByIdAndDelete(reviewId);
        res.json(restaurant.toObject({ getters: true }));
    }));

// USER

app.post('/register',
    userAlreadyExists,
    imageUpload.single('image'),
    validatePerson,
    catchAsync(async (req, res) => {

        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, email, password: hashedPassword });
        user.image = req.file.path;
        await user.save();

        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '7d' }
        );

        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            image: user.image,
            tokenExpirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            token
        });
    }));

app.post('/login',
    userExists,
    validateUser,
    catchAsync(async (req, res) => {

        const user = await User.findOne({ username: req.body.username });

        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '7d' }
        );

        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            image: user.image,
            tokenExpirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            token
        });
    }));

app.all('*', (req, res, next) => {
    next(new AppError('Resource not found', 400));
});

app.use((err, req, res, next) => {
    if (req.file)
        fs.unlink(req.file.path, () => { });

    const { message = 'Something went wrong!', statusCode = 500 } = err;
    res.status(statusCode).json({ message });
});

app.listen(9000, () => {
    console.log('Server running on port 9000');
});