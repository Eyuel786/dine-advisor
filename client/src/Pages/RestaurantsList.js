import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import CardList from '../shared/CardList';


function RestaurantsList() {
    const restaurants = useSelector(state => state.restaurants);

    return (
        <>
            <Typography
                variant='h3'
                align='center'
                gutterBottom>
                All Restaurants
            </Typography>
            <CardList
                restaurants={restaurants} />
        </>
    );
}

export default RestaurantsList;