import React from 'react';
import { Typography } from '@mui/material';
import CardList from '../shared/CardList';
import { restaurants } from '../helpers/restaurants';


function RestaurantsList() {

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