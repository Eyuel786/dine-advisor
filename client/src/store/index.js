import { configureStore } from '@reduxjs/toolkit';
import {
    restaurantsSlice, restaurantsActions, fetchAllRestaurants,
    sendNewRestaurant, sendUpdateRestaurant, removeRestaurantFromDB
} from './restaurantsSlice';


export const store = configureStore({
    reducer: restaurantsSlice.reducer
});

export {
    restaurantsActions, fetchAllRestaurants, sendNewRestaurant,
    sendUpdateRestaurant, removeRestaurantFromDB
};