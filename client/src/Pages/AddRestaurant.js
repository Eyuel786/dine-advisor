import React from 'react';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import RestaurantForm from '../shared/RestaurantForm';
import { restaurantsActions } from '../store';

function AddRestaurant() {
    const dispatch = useDispatch();

    const addNewRestaurant = restaurant => {
        dispatch(restaurantsActions.add({ restaurant }));
    }

    return (
        <>
            <Typography
                variant='h3'
                align='center'
                gutterBottom>
                Add a Restaurant
            </Typography>
            <RestaurantForm
                addNewRestaurant={addNewRestaurant} />
        </>
    );
}

export default AddRestaurant;