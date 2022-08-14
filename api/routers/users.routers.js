const express = require('express');
const router = express.Router();


const {
    userAlreadyExists, validatePerson,
    userExists, validateUser
} = require('../helpers/middlewares');
const imageUpload = require('../helpers/imageUpload');
const usersController = require('../controllers/users.controller');
const catchAsync = require('../helpers/catchAsync');


router.post('/register',
    userAlreadyExists,
    imageUpload.single('image'),
    validatePerson,
    catchAsync(usersController.register));

router.post('/login',
    userExists,
    validateUser,
    catchAsync(usersController.login));

module.exports = router;