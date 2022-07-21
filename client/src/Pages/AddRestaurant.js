import React from 'react';
import { Typography } from '@mui/material';
import RestaurantForm from '../shared/RestaurantForm';



function AddRestaurant() {

    return (
        <>
            <Typography
                variant='h3'
                align='center'
                gutterBottom>
                Add a Restaurant
            </Typography>
            <RestaurantForm />
        </>
    );
}

export default AddRestaurant;