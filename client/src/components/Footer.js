import React from 'react';
import { Box, Grid, Typography, Hidden } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    footer: {
        margin: '1rem 0 0',
        padding: '1rem 6rem',
        backgroundColor: '#faf1ed',
        position: 'relative',
        [theme.breakpoints.down('lg')]: {
            padding: '1rem'
        }
    },
    logo: {
        '&.MuiTypography-root': {
            ...theme.typography.logo,
            color: '#000'
        }
    },
    link: {
        '&.MuiGrid-item': {
            ...theme.typography.tab,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline 2px'
            }
        }
    },
    mainContainer: {
        position: 'absolute',
        top: '2rem',
        left: '5rem'
    }
}));

function Footer(props) {
    const styles = useStyles();
    const { token } = props;

    return (
        <Box className={styles.footer}>
            <Hidden mdDown>
                <Grid
                    justifyContent='center'
                    spacing={6}
                    container
                    className={styles.mainContainer}>
                    <Grid item>
                        <Grid container direction='column'>
                            <Grid
                                item
                                to='/home'
                                component={Link}
                                className={styles.link}>
                                Home
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction='column'>
                            <Grid
                                item
                                to='/restaurants'
                                component={Link}
                                className={styles.link}>
                                Restaurants
                            </Grid>
                            <Grid
                                item
                                to='/meals'
                                component={Link}
                                className={styles.link}>
                                Meals
                            </Grid>
                        </Grid>
                    </Grid>
                    {token && <Grid item>
                        <Grid container direction='column'>
                            <Grid
                                item
                                to='/restaurants/new'
                                component={Link}
                                className={styles.link}>
                                Add Restaurant
                            </Grid>
                        </Grid>
                    </Grid>}
                    <Grid item>
                        <Grid container direction='column'>
                            <Grid
                                item
                                to='/contact'
                                component={Link}
                                className={styles.link}>
                                Contact Us
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid
                                item
                                to='/about'
                                component={Link}
                                className={styles.link}>
                                About Us
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
            <Typography
                className={styles.logo}
                align='left'>
                Dineadvisor
            </Typography>
        </Box>
    );
}

export default Footer;