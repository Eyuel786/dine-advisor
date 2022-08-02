import React from 'react';
import {
    Card, CardContent, CardMedia, Box,
    Typography, Divider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
    list: {
        ...theme.typography.canvas,
        [theme.breakpoints.down('md')]: {
            padding: '1rem'
        },
    },
    card: {
        marginBottom: '12px',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    cardImg: {
        '&.MuiCardMedia-root': {
            width: '300px',
            height: '220px',
            [theme.breakpoints.down('md')]: {
                flex: 0.7,
                height: '100%',
            },
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            }
        }
    },
    cardContent: {
        [theme.breakpoints.down('md')]: {
            flex: 1
        }
    },
    name: {
        ...theme.typography.h4,
        textDecoration: 'none',
        color: '#000',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    }
}))

function RestaurantsList() {
    const styles = useStyles();
    const restaurants = useSelector(state => state.restaurants.restaurants);

    return (
        <>
            <Typography
                variant='h3'
                align='center'
                gutterBottom>
                All Restaurants
            </Typography>
            {!!restaurants.length && <Box className={styles.list}>
                {restaurants.map(r => (
                    <Card
                        key={r.id}
                        elevation={0}
                        className={styles.card}>
                        <CardMedia
                            image={`http://localhost:9000/${r.image}`}
                            component='img'
                            alt={r.name}
                            className={styles.cardImg} />
                        <CardContent className={styles.cardContent}>
                            <Link
                                className={styles.name}
                                to={`/restaurants/${r.id}`}>
                                {r.name}
                            </Link>
                            <Typography
                                variant='subtitle1'>
                                {`${r.city}, ${r.state}`}
                            </Typography>
                            <Typography
                                variant='subtitle1'>
                                {`${r.reviews.length} reviews`}
                            </Typography>
                            <Divider />
                            <Typography
                                sx={{ margin: '1rem 0' }}
                                variant='body1'
                                color='text.secondary'>
                                {r.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>}
            {!restaurants.length &&
                <Typography>No restaurants found</Typography>}
        </>
    );
}

export default RestaurantsList;