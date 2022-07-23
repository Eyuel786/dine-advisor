import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';


const initialState = {
    restaurants: [
        {
            id: uuid(),
            name: 'Tuscany Courtyard',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias est reiciendis ipsam velit accusantium necessitatibus repudiandae, voluptatibus veritatis tempore atque',
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
            city: 'Los Angeles',
            state: 'California',
            country: 'United States',
            email: 'tuscanyC@gmail.com'
        },
        {
            id: uuid(),
            name: 'Grill & Chill',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, voluptatum veritatis! Repellendus ad atque nemo libero assumenda. Minima, repellat debitis',
            image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            city: 'Denver',
            state: 'Colorado',
            country: 'United States',
            email: 'grillChill@gmail.com'
        }
    ]
}


export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        replace: (state, action) => {
            state.restaurants = [...action.payload.restaurants]
        },
        add: (state, action) => {
            state.restaurants.push({ ...action.payload.restaurant });
        },
        update: (state, action) => {
            const index = state.restaurants.findIndex(r => r.id === action.payload.id);
            state.restaurants.splice(index, 1, { ...action.payload.restaurant });
        },
        remove: (state, action) => {
            const index = state.restaurants.findIndex(r => r.id === action.payload.id);
            state.restaurants.splice(index, 1);
        }
    }
});

export const restaurantsActions = restaurantsSlice.actions;