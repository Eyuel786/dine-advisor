import React from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Button, Divider, Grid, Rating, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';


import { removeReviewFromDB } from '../store';

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: '#fff',
        width: '30rem',
        padding: '0 1rem'
    },
    review: {
        padding: '1rem 0'
    }
}));


function Reviews(props) {
    const styles = useStyles();
    const dispatch = useDispatch();
    const { restaurant, userId } = props;

    return (
        <>
            {!!restaurant.reviews.length &&
                <Typography variant='h3' gutterBottom>Reviews</Typography>}
            <Box className={styles.background}>
                {restaurant.reviews.map(r => {
                    const isReviewAuthor = r.creator === userId;
                    return (
                        <Box key={r.id}>
                            <Box
                                className={styles.review}>
                                <Grid
                                    container
                                    justifyContent='space-between'>
                                    <Grid
                                        item
                                        sm={4}
                                        alignSelf='center'>
                                        <Avatar
                                            sx={{
                                                margin: '0 auto',
                                                width: 56,
                                                height: 56,
                                                marginBottom: '0.5rem'
                                            }}
                                            src={`http://localhost:9000/${r.creator.image}`}
                                            alt={r.creator.username} />
                                        <Typography
                                            variant='h4'
                                            align='center'>
                                            {r.creator.username}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={8}>
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
                                        {isReviewAuthor && <Button
                                            sx={{ textTransform: 'none' }}
                                            variant='contained'
                                            size='small'
                                            color='error'
                                            onClick={() =>
                                                (dispatch(removeReviewFromDB(restaurant.id, r.id)))}>
                                            Delete
                                        </Button>}
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider />
                        </Box>)
                })}
            </Box>
        </>
    );
}

export default Reviews;