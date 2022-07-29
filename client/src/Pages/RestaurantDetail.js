import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';


import { removeRestaurantFromDB } from '../store';


import DetailCard from '../shared/DetailCard';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';


const useStyles = makeStyles(theme => ({
    background: {
        ...theme.typography.canvas
    },
}));

function RestaurantDetail() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const restaurants = useSelector(state => state.restaurants.restaurants);
    const restaurant = restaurants.find(r => r.id === id);

    const removeRestaurant = () => dispatch(removeRestaurantFromDB(id));

    return (
        <Box className={styles.background}>
            <Grid container justifyContent='space-between'>
                <Grid item>
                    <DetailCard
                        restaurant={restaurant}
                        removeRestaurant={removeRestaurant} />
                </Grid>
                <Grid item>
                    <AddReview id={id} />
                    <Reviews restaurant={restaurant} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default RestaurantDetail;