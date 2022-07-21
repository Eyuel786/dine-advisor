import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';



const useStyles = makeStyles(theme => ({
    background: {
        minHeight: '100vh',
        padding: '1rem 6rem',
        [theme.breakpoints.down('md')]: {
            padding: '1rem'
        }
    },
    submitBtn: {
        '&.MuiButton-root': {
            borderRadius: '50px',
            color: '#fff',
            backgroundColor: theme.palette.primary.main,
            margin: '2rem 0',
            textTransform: 'none',
            height: '43px',
            padding: '20px',
            fontSize: '0.9rem',
            fontFamily: 'Raleway',
            fontWeight: 700,
            '&:hover': {
                backgroundColor: theme.palette.primary.light
            }
        }
    }
}));

function RestaurantForm() {
    const styles = useStyles();

    return (
        <Box className={styles.background}>
            <Box sx={{ width: '25rem' }}>
                <form>
                    <Typography
                        variant='h4'
                        sx={{ mb: 2 }}>
                        Name & Description
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label='Name' />
                        <TextField
                            label='Description'
                            rows={3}
                            multiline />
                    </Stack>

                    <Typography
                        variant='h4'
                        sx={{ mb: 2, mt: 3 }}>
                        Address
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label='City' />
                        <TextField
                            label='State' />
                    </Stack>

                    {/* MOVE THE IMAGE TO RIGHT SIDE 
                    when you add uploading feature */}
                    <Typography
                        variant='h4'
                        sx={{ mb: 2, mt: 3 }}>
                        Image
                    </Typography>
                    <TextField
                        label='Image url' fullWidth />

                    <Typography
                        variant='h4'
                        sx={{ mb: 2, mt: 3 }}>
                        Contact Information
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label='Telephone' />
                        <TextField
                            label='Email' />
                    </Stack>
                    <Button
                        className={styles.submitBtn}
                        variant='contained'
                        type='submit'>
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default RestaurantForm;