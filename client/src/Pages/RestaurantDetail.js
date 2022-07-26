import React from 'react';
import { useStore } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';


import { removeRestaurantFromDB } from '../store';


import DetailCard from '../shared/DetailCard';


const useStyles = makeStyles(theme => ({
    background: {
        ...theme.typography.canvas
    },

}));

function RestaurantDetail() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const state = useStore().getState();
    const restaurant = state.restaurants.find(r => r.id === id);

    const removeRestaurant = () => dispatch(removeRestaurantFromDB(id));

    return (
        <Box className={styles.background}>
            <Grid container>
                <Grid item>
                    <DetailCard
                        restaurant={restaurant}
                        removeRestaurant={removeRestaurant} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default RestaurantDetail;