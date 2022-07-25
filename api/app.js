const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

const Restaurant = require('./models/Restaurant');

mongoose.connect('mongodb://localhost:27017/dine-advisor-db')
    .then(res => console.log('Database connected'))
    .catch(err => console.log('Could not connect ot Database'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find({});
    res.json(restaurants.map(r => r.toObject({ getters: true })));
});

app.post('/restaurants', async (req, res) => {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant.toObject({ getters: true }));
});

app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant.toObject({ getters: true }));
});

app.patch('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id,
        req.body, { new: true, runValidators: true });
    res.json(restaurant.toObject({ getters: true }));
});

app.delete('/restaurants/:id', async (req, res) => {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted' });
});

app.listen(9000, () => {
    console.log('Server running on port 9000');
});