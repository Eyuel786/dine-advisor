import React from 'react';
import {
    Card, CardContent, CardMedia, Box,
    Typography,
    Divider,
    Link
} from '@mui/material';
import { makeStyles } from '@mui/styles';



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
        '&.MuiTypography-root': {
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline'
            }
        }
    }
}));

function CardList({ restaurants }) {
    const styles = useStyles();

    return (
        <Box className={styles.list}>
            {restaurants.map(r => (
                <Card
                    key={r.id}
                    elevation={0}
                    className={styles.card}>
                    <CardMedia
                        image={r.image}
                        component='img'
                        alt={r.name}
                        className={styles.cardImg} />
                    <CardContent className={styles.cardContent}>
                        <Typography
                            className={styles.name}
                            variant='h4'
                            to={`/restaurants/${r.id}`}
                            component={Link}
                            gutterBottom>
                            {r.name}
                        </Typography>
                        <Typography
                            variant='subtitle1'>
                            0 reviews
                        </Typography>
                        <Typography
                            variant='subtitle1'>
                            {r.location}
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
        </Box>
    );
}

export default CardList;