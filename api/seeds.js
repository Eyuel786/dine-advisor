const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');


mongoose.connect('mongodb://localhost:27017/dine-advisor-db')
    .then(res => console.log('Database connected'))
    .catch(err => console.log('Error connecting to database'));

const seedDB = async () => {
    const tuscany = new Restaurant({
        name: 'Tuscany Courtyard',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias est reiciendis ipsam velit accusantium necessitatibus repudiandae, voluptatibus veritatis tempore atque',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        email: 'tuscanyC@gmail.com'
    });

    const grill = new Restaurant({
        name: 'Grill & Chill',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, voluptatum veritatis! Repellendus ad atque nemo libero assumenda. Minima, repellat debitis',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        email: 'grillChill@gmail.com'
    });

    await Restaurant.insertMany([tuscany, grill]);
}

seedDB()
    .then(res => mongoose.connection.close())
    .catch(err => console.log('Error seeding DB'));