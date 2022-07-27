import React from 'react';
import {
    Card, CardMedia, CardContent, Typography,
    Divider, CardActions, Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    card: {
        width: '24rem'
    },
    button: {
        '&.MuiButton-root': {
            textTransform: 'none'
        }
    },
    editBtn: {
        '&.MuiButton-root': {
            '&:hover': {
                backgroundColor: theme.palette.primary.light
            }
        }
    }
}));

function DetailCard(props) {
    const styles = useStyles();
    const navigate = useNavigate();
    const { restaurant, removeRestaurant } = props;

    return (
        <Card
            elevation={0}
            className={styles.card}>
            <CardMedia
                image={restaurant.image}
                alt={restaurant.name}
                height='240'
                component='img'
            />
            <CardContent>
                <Typography
                    variant='h4'
                    gutterBottom>
                    {restaurant.name}
                </Typography>
                <Typography
                    variant='body1'
                    color='text.secondary'
                    gutterBottom>
                    {restaurant.description}
                </Typography>
                <Divider />
                <Typography
                    sx={{ padding: '4px 0' }}>
                    {`${restaurant.state}, 
                                ${restaurant.city}`}
                </Typography>
                <Divider />
                <Typography
                    sx={{ padding: '4px 0' }}>
                    {restaurant.email}
                </Typography>
                <Divider />
            </CardContent>
            <CardActions>
                <Button
                    sx={{ margin: '0 0.5rem' }}
                    className={`${styles.button} ${styles.editBtn}`}
                    size='small'
                    variant='contained'
                    to={`/restaurants/${restaurant.id}/edit`}
                    component={Link}>
                    Edit
                </Button>
                <Button
                    className={styles.button}
                    size='small'
                    variant='contained'
                    color='error'
                    onClick={() => {
                        removeRestaurant();
                        navigate('/restaurants');
                    }}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default DetailCard;