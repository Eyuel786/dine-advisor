import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
    validateName, validateDescription, validateCity, validateState,
    validateCountry, validateImage, validateEmail
} from '../validators/validateRestaurant';
import { useInputState } from '../hooks/useInputState';

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
            margin: '2rem 0 3rem',
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

function RestaurantForm(props) {
    const styles = useStyles();
    const navigate = useNavigate();
    const { addNewRestaurant } = props;

    const {
        enteredValue: name,
        inputIsValid: nameIsValid,
        inputHasError: nameHasError,
        errorMessage: nameErrorMessage,
        handleChange: handleNameChange,
        handleBlur: handleNameBlur,
        reset: resetName
    } = useInputState('', validateName);

    const {
        enteredValue: description,
        inputIsValid: descriptionIsValid,
        inputHasError: descriptionHasError,
        errorMessage: descriptionErrorMessage,
        handleChange: handleDescriptionChange,
        handleBlur: handleDescriptionBlur,
        reset: resetDescription
    } = useInputState('', validateDescription);

    const {
        enteredValue: city,
        inputIsValid: cityIsValid,
        inputHasError: cityHasError,
        errorMessage: cityErrorMessage,
        handleChange: handleCityChange,
        handleBlur: handleCityBlur,
        reset: resetCity
    } = useInputState('', validateCity);

    const {
        enteredValue: state,
        inputIsValid: stateIsValid,
        inputHasError: stateHasError,
        errorMessage: stateErrorMessage,
        handleChange: handleStateChange,
        handleBlur: handleStateBlur,
        reset: resetState
    } = useInputState('', validateState);

    const {
        enteredValue: country,
        inputIsValid: countryIsValid,
        inputHasError: countryHasError,
        errorMessage: countryErrorMessage,
        handleChange: handleCountryChange,
        handleBlur: handleCountryBlur,
        reset: resetCountry
    } = useInputState('', validateCountry);

    const {
        enteredValue: image,
        inputIsValid: imageIsValid,
        inputHasError: imageHasError,
        errorMessage: imageErrorMessage,
        handleChange: handleImageChange,
        handleBlur: handleImageBlur,
        reset: resetImage
    } = useInputState('', validateImage);

    const {
        enteredValue: email,
        inputIsValid: emailIsValid,
        inputHasError: emailHasError,
        errorMessage: emailErrorMessage,
        handleChange: handleEmailChange,
        handleBlur: handleEmailBlur,
        reset: resetEmail
    } = useInputState('', validateEmail);

    const formIsValid = nameIsValid && descriptionIsValid && cityIsValid
        && stateIsValid && countryIsValid && imageIsValid && emailIsValid;

    const clearForm = () => {
        resetName();
        resetDescription();
        resetCity();
        resetState();
        resetCountry();
        resetImage();
        resetEmail();
    }

    const handleSubmit = e => {
        e.preventDefault();

        handleNameBlur();
        handleDescriptionBlur();
        handleCityBlur();
        handleStateBlur();
        handleCountryBlur();
        handleImageBlur();
        handleEmailBlur();

        if (!formIsValid) {
            console.log('Form is not valid');
            return;
        }

        addNewRestaurant({
            name, description, city, state, country, image, email
        });
        navigate('/restaurants');

        clearForm();
    }

    return (
        <Box className={styles.background}>
            <Box sx={{ width: '25rem' }}>
                <form onSubmit={handleSubmit}>
                    <Typography
                        variant='h4'
                        sx={{ mb: 2 }}>
                        Name & Description
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label='Name'
                            value={name}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                            error={nameHasError}
                            helperText={nameHasError && nameErrorMessage} />
                        <TextField
                            label='Description'
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
                            label='City'
                            value={city}
                            onChange={handleCityChange}
                            onBlur={handleCityBlur}
                            error={cityHasError}
                            helperText={cityHasError && cityErrorMessage} />
                        <TextField
                            label='State'
                            value={state}
                            onChange={handleStateChange}
                            onBlur={handleStateBlur}
                            error={stateHasError}
                            helperText={stateHasError && stateErrorMessage} />
                        <TextField
                            label='Country'
                            value={country}
                            onChange={handleCountryChange}
                            onBlur={handleCountryBlur}
                            error={countryHasError}
                            helperText={countryHasError && countryErrorMessage} />
                    </Stack>

                    {/* MOVE THE IMAGE TO RIGHT SIDE 
                    when you add uploading feature */}
                    <Typography
                        variant='h4'
                        sx={{ mb: 2, mt: 3 }}>
                        Image
                    </Typography>
                    <TextField
                        label='Image url'
                        value={image}
                        onChange={handleImageChange}
                        onBlur={handleImageBlur}
                        error={imageHasError}
                        helperText={imageHasError && imageErrorMessage}
                        fullWidth />

                    <Typography
                        variant='h4'
                        sx={{ mb: 2, mt: 3 }}>
                        Contact Information
                    </Typography>
                    <TextField
                        label='Email'
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
        </Box>
    );
}

export default RestaurantForm;