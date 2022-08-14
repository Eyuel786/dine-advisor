if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

const AppError = require('./helpers/AppError');
const restaurantsRouters = require('./routers/restaurants.routers');
const reviewsRouters = require('./routers/reviews.routers');
const usersRouters = require('./routers/users.routers');

mongoose.connect('mongodb://localhost:27017/dine-advisor-db')
    .then(res => console.log('Database connected'))
    .catch(err => console.log('Could not connect to Database'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads/images', express.static(path.join(__dirname, '/uploads/images')));

app.use('/restaurants', restaurantsRouters);
app.use('/restaurants/:id', reviewsRouters);
app.use('/', usersRouters);

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