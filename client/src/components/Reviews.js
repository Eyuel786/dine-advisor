import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Divider, Rating, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';


import { removeReviewFromDB } from '../store';

const useStyles = makeStyles(theme => ({
    background: {
        margin: '2rem 0',
        backgroundColor: '#fff',
        width: '24rem',
        padding: '0 1rem'
    },
    review: {
        padding: '1rem 0'
    }
}));


function Reviews({ restaurant }) {
    const styles = useStyles();
    const dispatch = useDispatch();

    return (
        <Box className={styles.background}>
            {restaurant.reviews.map(r =>
            (
                <>
                    <Box
                        className={styles.review}>
                        <Rating
                            value={r.rating}
                            readOnly />
                        <Typography
                            variant='h4'
                            gutterBottom>
                            {r.title}
                        </Typography>
                        <Typography
                            variant='body1'
                            gutterBottom>
                            {r.comment}
                        </Typography>
                        <Button
                            sx={{ textTransform: 'none' }}
                            variant='contained'
                            size='small'
                            color='error'
                            onClick={() =>
                                (dispatch(removeReviewFromDB(restaurant.id, r.id)))}>
                            Delete
                        </Button>
                    </Box>
                    <Divider />
                </>))
            }
        </Box>
    );
}

export default Reviews;