if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

const Restaurant = require('./models/Restaurant');
const Review = require('./models/Review');
const User = require('./models/User');
const AppError = require('./helpers/AppError');
const catchAsync = require('./helpers/catchAsync');
const { validateRestaurant, validatePerson, validateUser, userExists, userAlreadyExists } = require('./helpers/middlewares');

mongoose.connect('mongodb://localhost:27017/dine-advisor-db')
    .then(res => console.log('Database connected'))
    .catch(err => console.log('Could not connect ot Database'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/restaurants', catchAsync(async (req, res) => {
    const restaurants = await Restaurant.find({}).populate('reviews');
    res.json(restaurants.map(r => r.toObject({ getters: true })));
}));

app.post('/restaurants', validateRestaurant, catchAsync(async (req, res) => {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant.toObject({ getters: true }));
}));

app.get('/restaurants/:id', catchAsync(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id).populate('reviews');
    res.json(restaurant.toObject({ getters: true }));
}));

app.patch('/restaurants/:id', validateRestaurant, catchAsync(async (req, res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id,
        req.body, { new: true, runValidators: true }).populate('reviews');
    res.json(restaurant.toObject({ getters: true }));
}));

app.delete('/restaurants/:id', catchAsync(async (req, res) => {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted' });
}));

// REVIEWS

app.post('/restaurants/:id/reviews', catchAsync(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id).populate('reviews');
    const review = new Review(req.body);
    restaurant.reviews.push(review);
    await restaurant.save();
    await review.save();
    res.json(restaurant.toObject({ getters: true }));
}));

app.delete('/restaurants/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const restaurant = await Restaurant.findByIdAndUpdate(id,
        { $pull: { reviews: reviewId } }, { new: true, runValidators: true }).populate('reviews');
    await Review.findByIdAndDelete(reviewId);
    res.json(restaurant.toObject({ getters: true }));
}));

// USER

app.post('/register', validatePerson, userAlreadyExists, catchAsync(async (req, res) => {
    const { username, email, password, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword, image });
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

app.post('/login', validateUser, userExists, catchAsync(async (req, res) => {
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
    const { message = 'Something went wrong!', statusCode = 500 } = err;
    res.status(statusCode).json({ message });
});

app.listen(9000, () => {
    console.log('Server running on port 9000');
});