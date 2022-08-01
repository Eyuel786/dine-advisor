import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
    validateName, validateDescription, validateCity, validateState,
    validateCountry, validateEmail
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
        enteredValue: city,
        inputIsValid: cityIsValid,
        inputHasError: cityHasError,
        errorMessage: cityErrorMessage,
        handleChange: handleCityChange,
        handleBlur: handleCityBlur,
        reset: resetCity
    } = useInputState(restaurant && restaurant.city, validateCity);

    const {
        enteredValue: state,
        inputIsValid: stateIsValid,
        inputHasError: stateHasError,
        errorMessage: stateErrorMessage,
        handleChange: handleStateChange,
        handleBlur: handleStateBlur,
        reset: resetState
    } = useInputState(restaurant && restaurant.state, validateState);

    const {
        enteredValue: country,
        inputIsValid: countryIsValid,
        inputHasError: countryHasError,
        errorMessage: countryErrorMessage,
        handleChange: handleCountryChange,
        handleBlur: handleCountryBlur,
        reset: resetCountry
    } = useInputState(restaurant && restaurant.country, validateCountry);

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

    const formIsValid = nameIsValid && descriptionIsValid && cityIsValid
        && stateIsValid && countryIsValid && imgIsValid && emailIsValid;

    const clearForm = () => {
        resetName();
        resetDescription();
        resetCity();
        resetState();
        resetCountry();
        resetImg();
        resetEmail();
    }

    const handleSubmit = e => {
        e.preventDefault();

        handleNameBlur();
        handleDescriptionBlur();
        handleCityBlur();
        handleStateBlur();
        handleCountryBlur();
        handleEmailBlur();

        if (!formIsValid) {
            console.log('Form is not valid');
            return;
        }

        if (isEditing) {
            updateRestaurant({
                ...restaurant, name, description, city,
                state, country, image: imgFile, email
            });
        } else {
            addNewRestaurant({
                name, description, city,
                state, country, image: imgFile, email
            });
        }
        navigate('/restaurants');

        clearForm();
    }

    return (
        <Box className={styles.background}>
            <Grid container justifyContent='space-around'>
                <Grid item>
                    <Box sx={{ width: '25rem' }}>
                        <form onSubmit={handleSubmit}>
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

                            {/*Incorporate a map to specify location*/}
                            <Stack spacing={2}>
                                <TextField
                                    placeholder='City'
                                    value={city}
                                    onChange={handleCityChange}
                                    onBlur={handleCityBlur}
                                    error={cityHasError}
                                    helperText={cityHasError && cityErrorMessage} />
                                <TextField
                                    placeholder='State'
                                    value={state}
                                    onChange={handleStateChange}
                                    onBlur={handleStateBlur}
                                    error={stateHasError}
                                    helperText={stateHasError && stateErrorMessage} />
                                <TextField
                                    placeholder='Country'
                                    value={country}
                                    onChange={handleCountryChange}
                                    onBlur={handleCountryBlur}
                                    error={countryHasError}
                                    helperText={countryHasError && countryErrorMessage} />
                            </Stack>
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
                        </form>
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
        </Box>
    );
}

export default RestaurantForm;