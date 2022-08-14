const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const Restaurant = require('../models/Restaurant');

const mbxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mbxToken });

module.exports.index = async (req, res) => {
    const restaurants = await Restaurant.find({})
        .populate({ path: 'reviews', populate: { path: 'creator', model: 'User' } });
    res.json(restaurants.map(r => r.toObject({ getters: true })));
}

module.exports.createRestaurant = async (req, res, err) => {
    const { name, description, location, email } = req.body;
    const geoData = await geocoder.forwardGeocode({
        query: location,
        limit: 1
    }).send();

    const restaurant = new Restaurant({ name, description, location, email });
    restaurant.creator = req.currentUser;
    restaurant.image = req.file.path;
    restaurant.geometry = geoData.body.features[0].geometry;
    await restaurant.save();
    res.status(201).json(restaurant.toObject({ getters: true }));
}

module.exports.showRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
        .populate({ path: 'reviews', populate: { path: 'creator', model: 'user' } });
    res.json(restaurant.toObject({ getters: true }));
}

module.exports.updateRestaurant = async (req, res) => {
    const { name, description, location, email } = req.body;
    const geoData = await geocoder.forwardGeocode({
        query: location,
        limit: 1
    }).send();

    const restaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        { name, description, location, email },
        { new: true, runValidators: true })
        .populate({ path: 'reviews', populate: { path: 'creator', model: 'User' } });

    restaurant.geometry = geoData.body.features[0].geometry;
    await restaurant.save();

    if (req.file) {
        fs.unlink(restaurant.image, () => { });
        restaurant.image = req.file.path;
        await restaurant.save();
    }
    res.json(restaurant.toObject({ getters: true }));
}

module.exports.deleteRestaurant = async (req, res) => {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted' });
}