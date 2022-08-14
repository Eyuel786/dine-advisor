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
import ShowMap from '../components/ShowMap';


const useStyles = makeStyles(theme => ({
    background: {
        ...theme.typography.canvas
    }
}));

function RestaurantDetail(props) {
    const styles = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { userId } = props;
    const restaurants = useSelector(state => state.restaurants.restaurants);
    const restaurant = restaurants.find(r => r.id === id);

    const removeRestaurant = () => dispatch(removeRestaurantFromDB(id));

    return (
        <Box className={styles.background}>
            <Grid
                container
                direction='column'
                justifyContent='space-between'>
                <Grid item>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <DetailCard
                                userId={userId}
                                restaurant={restaurant}
                                removeRestaurant={removeRestaurant} />
                        </Grid>
                        <Grid item>
                            <ShowMap geometry={restaurant.geometry} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Reviews
                                restaurant={restaurant}
                                userId={userId} />
                        </Grid>
                        <Grid item>
                            {userId && <AddReview id={id} />}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default RestaurantDetail;