import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
    validateName, validateDescription, validateEmail, validateLocation
} from '../validators/validateRestaurant';
import { useInputState } from '../hooks/useInputState';
import ImageUpload from '../components/ImageUpload';
import { useImgState } from '../hooks/useImgState';

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
            ...theme.typography.btn,
            margin: '2rem 0 3rem',
            '&:hover': {
                backgroundColor: theme.palette.primary.light
            }
        }
    }
}));

function RestaurantForm(props) {
    const styles = useStyles();
    const navigate = useNavigate();
    const {
        addNewRestaurant, restaurant,
        updateRestaurant, isEditing
    } = props;

    const {
        enteredValue: name,
        inputIsValid: nameIsValid,
        inputHasError: nameHasError,
        errorMessage: nameErrorMessage,
        handleChange: handleNameChange,
        handleBlur: handleNameBlur,
        reset: resetName
    } = useInputState(restaurant && restaurant.name, validateName);

    const {
        enteredValue: description,
        inputIsValid: descriptionIsValid,
        inputHasError: descriptionHasError,
        errorMessage: descriptionErrorMessage,
        handleChange: handleDescriptionChange,
        handleBlur: handleDescriptionBlur,
        reset: resetDescription
    } = useInputState(restaurant && restaurant.description, validateDescription);

    const {
        enteredValue: location,
        inputIsValid: locationIsValid,
        inputHasError: locationHasError,
        errorMessage: locationErrorMessage,
        handleChange: handleLocationChange,
        handleBlur: handleLocationBlur,
        reset: resetLocation
    } = useInputState(restaurant && restaurant.location, validateLocation);

    const {
        enteredValue: email,
        inputIsValid: emailIsValid,
        inputHasError: emailHasError,
        errorMessage: emailErrorMessage,
        handleChange: handleEmailChange,
        handleBlur: handleEmailBlur,
        reset: resetEmail
    } = useInputState(restaurant && restaurant.email, validateEmail);

    const [imgState, handleImgChange, resetImg] = useImgState(
        restaurant && `http://localhost:9000/${restaurant.image}`, !!restaurant
    );

    const { imgFile, imgPreviewUrl, imgIsValid } = imgState;

    const formIsValid = nameIsValid && descriptionIsValid && locationIsValid
        && imgIsValid && emailIsValid;

    const clearForm = () => {
        resetName();
        resetDescription();
        resetLocation();
        resetImg();
        resetEmail();
    }

    const handleSubmit = e => {
        e.preventDefault();

        handleNameBlur();
        handleDescriptionBlur();
        handleLocationBlur();
        handleEmailBlur();

        if (!formIsValid) {
            console.log('Form is not valid');
            return;
        }

        if (isEditing) {
            updateRestaurant({
                ...restaurant, name, description, location,
                image: imgFile, email
            });
        } else {
            addNewRestaurant({
                name, description, location,
                image: imgFile, email
            });
        }
        navigate('/restaurants');

        clearForm();
    }

    return (
        <Box className={styles.background}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={14} justifyContent='center'>
                    <Grid item>
                        <Box sx={{ width: '25rem' }}>
                            <Typography
                                variant='h4'
                                sx={{ mb: 2 }}>
                                Name & Description
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    placeholder='Name'
                                    value={name}
                                    onChange={handleNameChange}
                                    onBlur={handleNameBlur}
                                    error={nameHasError}
                                    helperText={nameHasError && nameErrorMessage} />
                                <TextField
                                    placeholder='Description'
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    onBlur={handleDescriptionBlur}
                                    error={descriptionHasError}
                                    helperText={descriptionHasError && descriptionErrorMessage}
                                    rows={3}
                                    multiline />
                            </Stack>

                            <Typography
                                variant='h4'
                                sx={{ mb: 2, mt: 3 }}>
                                Address
                            </Typography>

                            <TextField
                                placeholder='Location'
                                value={location}
                                onChange={handleLocationChange}
                                onBlur={handleLocationBlur}
                                error={locationHasError}
                                helperText={locationHasError && locationErrorMessage}
                                fullWidth />

                            <Typography
                                variant='h4'
                                sx={{ mb: 2, mt: 3 }}>
                                Contact Information
                            </Typography>
                            <TextField
                                placeholder='Email'
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={handleEmailBlur}
                                error={emailHasError}
                                helperText={emailHasError && emailErrorMessage}
                                fullWidth />
                            <Button
                                className={styles.submitBtn}
                                variant='contained'
                                type='submit'
                                disabled={!formIsValid}>
                                Submit
                            </Button>

                        </Box>
                    </Grid>
                    <Grid item alignSelf='center'>
                        <Typography
                            variant='h4'
                            sx={{ mb: 2, mt: 3 }}>
                            Image
                        </Typography>
                        <ImageUpload
                            imgPreviewUrl={imgPreviewUrl}
                            handleImgChange={handleImgChange} />
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default RestaurantForm;