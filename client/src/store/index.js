import { configureStore } from '@reduxjs/toolkit';
import {
    restaurantsSlice, restaurantsActions, fetchAllRestaurants,
    sendNewRestaurant, sendUpdatedRestaurant, removeRestaurantFromDB,
    sendNewReview, removeReviewFromDB
} from './restaurantsSlice';

import {
    authActions, sendSignInRequest,
    sendSignUpRequest, logoutRequest, authSlice
} from './authSlice';


export const store = configureStore({
    reducer: {
        restaurants: restaurantsSlice.reducer,
        auth: authSlice.reducer
    }
});

export {
    restaurantsActions, fetchAllRestaurants, sendNewRestaurant,
    sendUpdatedRestaurant, removeRestaurantFromDB, sendNewReview,
    removeReviewFromDB
};

export {
    authActions, sendSignInRequest, sendSignUpRequest,
    logoutRequest
};