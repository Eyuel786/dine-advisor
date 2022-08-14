const express = require('express');
const router = express.Router();

const {
    isAuthenticated, validateRestaurant,
    restaurantExists, isAuthor
} = require('../helpers/middlewares');
const imageUpload = require('../helpers/imageUpload');
const catchAsync = require('../helpers/catchAsync');
const restaurantContoller = require('../controllers/restaurants.controller');


router.route('/')
    .get(catchAsync(restaurantContoller.index))
    .post(
        isAuthenticated,
        imageUpload.single('image'),
        validateRestaurant,
        catchAsync(restaurantContoller.createRestaurant));

router.route('/:id')
    .get(
        restaurantExists,
        catchAsync(restaurantContoller.showRestaurant))
    .patch(
        isAuthenticated,
        restaurantExists,
        isAuthor,
        imageUpload.single('image'),
        validateRestaurant,
        catchAsync(restaurantContoller.updateRestaurant))
    .delete(
        isAuthenticated,
        restaurantExists,
        isAuthor,
        catchAsync(restaurantContoller.deleteRestaurant));

module.exports = router;