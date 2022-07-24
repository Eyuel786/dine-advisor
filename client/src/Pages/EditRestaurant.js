import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'react-redux';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';


import RestaurantForm from '../shared/RestaurantForm';
import { restaurantsActions } from '../store';

function EditRestaurant() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const state = useStore().getState();
    const restaurant = state.restaurants.find(r => r.id === id);

    const updateRestaurant = updatedRestaurant =>
        (dispatch(restaurantsActions.update({ id, restaurant: updatedRestaurant })));

    return (
        <>
            <Typography
                variant='h3'
                align='center'
                gutterBottom>
                {restaurant.name}
            </Typography>
            <RestaurantForm
                isEditing
                restaurant={restaurant}
                updateRestaurant={updateRestaurant} />
        </>
    );
}

export default EditRestaurant;