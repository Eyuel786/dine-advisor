const mongoose = require('mongoose');


const restaurantSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    city: String,
    state: String,
    country: String,
    email: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);