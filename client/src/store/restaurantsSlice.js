import { createSlice } from '@reduxjs/toolkit';


export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: { restaurants: [] },
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

const url = 'http://localhost:9000/restaurants';

export const fetchAllRestaurants = () => {
    return async dispatch => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error sending restaurant');

            const responseData = await response.json();
            dispatch(restaurantsActions.replace({ restaurants: responseData }));
        } catch (err) {
            console.log('Error:', err.message);
        }
    }
}

export const sendNewRestaurant = restaurant => {
    return async (dispatch, getState) => {
        try {
            const myState = getState();
            const { token } = myState.auth.auth;

            const {
                name, description, image, location, email
            } = restaurant;

            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('image', image);
            formData.append('location', location);
            formData.append('email', email);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                body: formData
            });

            if (!response.ok) throw new Error('Error sending new restaurant');

            const responseData = await response.json();
            dispatch(restaurantsActions.add({ restaurant: responseData }));

        } catch (err) {
            console.log('Error:', err.message);
        }
    }
}

export const sendUpdatedRestaurant = (id, restaurant) => {
    return async (dispatch, getState) => {
        try {
            const myState = getState();
            const { token } = myState.auth.auth;

            const {
                name, description, image, location, email
            } = restaurant;

            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('image', image);
            formData.append('location', location);
            formData.append('email', email);

            const response = await fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: formData
            });

            if (!response.ok) throw new Error('Error sending updated restaurant');

            const responseData = await response.json();
            dispatch(restaurantsActions.update({ id, restaurant: responseData }));
        } catch (err) {
            console.log('Error:', err.message)
        }
    }
}

export const removeRestaurantFromDB = id => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const { token } = state.auth.auth;

            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!response.ok) throw new Error('Error removing restaurant from DB');

            await response.json();
            dispatch(restaurantsActions.remove({ id }));
        } catch (err) {
            console.log('Error:', err.message);
        }
    }
}

export const sendNewReview = (id, review) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const { token } = state.auth.auth;

            const response = await fetch(`${url}/${id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(review)
            });

            if (!response.ok) throw new Error('Error sending new review');

            const responseData = await response.json();
            dispatch(restaurantsActions.update({ id, restaurant: responseData }));

        } catch (err) {
            console.log('Error:', err.message);
        }
    }
}

export const removeReviewFromDB = (id, reviewId) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const { token } = state.auth.auth;

            const response = await fetch(`${url}/${id}/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!response.ok) throw new Error('Error removing review from DB');

            const responseData = await response.json();
            dispatch(restaurantsActions.update({ id, restaurant: responseData }));

        } catch (err) {
            console.log('Error:', err.message);
        }
    }
}