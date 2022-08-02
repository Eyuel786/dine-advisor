import React from 'react';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';

import { useInputState } from '../hooks/useInputState';
import {
    validateUsername, validateEmail,
    validatePassword, validatePassword2
} from '../validators/validateUser';
import { useImgState } from '../hooks/useImgState';
import ImageUpload from '../components/ImageUpload';

const useStyles = makeStyles(theme => ({
    background: {
        minHeight: '100vh'
    },
    box: {
        margin: '0 auto',
        width: '24rem',
        padding: '1rem'
    },
    submitBtn: {
        '&.MuiButton-root': {
            ...theme.typography.btn,
            margin: '2rem 0 2rem',
            '&:hover': {
                backgroundColor: theme.palette.primary.light
            }
        }
    },
    qText: {
        '&.MuiTypography-root': {
            display: 'inline-block',
            marginRight: '8px',
        }
    },
    link: {
        color: '#000',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}));

function UserForm(props) {
    const styles = useStyles();
    const navigate = useNavigate();
    const { isLoggingIn, register, login } = props;

    const {
        enteredValue: username,
        inputIsValid: usernameIsValid,
        inputHasError: usernameHasError,
        errorMessage: usernameErrorMessage,
        handleChange: handleUsernameChange,
        handleBlur: handleUsernameBlur,
        reset: resetUsername
    } = useInputState('', validateUsername);

    const {
        enteredValue: email,
        inputIsValid: emailIsValid,
        inputHasError: emailHasError,
        errorMessage: emailErrorMessage,
        handleChange: handleEmailChange,
        handleBlur: handleEmailBlur,
        reset: resetEmail
    } = useInputState('', validateEmail);

    const {
        enteredValue: password,
        inputIsValid: passwordIsValid,
        inputHasError: passwordHasError,
        errorMessage: passwordErrorMessage,
        handleChange: handlePasswordChange,
        handleBlur: handlePasswordBlur,
        reset: resetPassword
    } = useInputState('', validatePassword);

    const {
        enteredValue: password2,
        inputIsValid: password2IsValid,
        inputHasError: password2HasError,
        errorMessage: password2ErrorMessage,
        handleChange: handlePassword2Change,
        handleBlur: handlePassword2Blur,
        reset: resetPassword2
    } = useInputState('', validatePassword2, { value2: password });

    const [imgState, handleImgChange, resetImg] = useImgState();

    const { imgFile, imgPreviewUrl, imgIsValid } = imgState;

    let formIsValid;
    if (isLoggingIn) {
        formIsValid = usernameIsValid && passwordIsValid;
    } else {
        formIsValid = usernameIsValid && imgIsValid
            && emailIsValid && passwordIsValid && password2IsValid
    }

    const clearForm = () => {
        resetUsername();
        resetPassword();
        if (!isLoggingIn) {
            resetImg();
            resetEmail();
            resetPassword2();
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!formIsValid) {
            console.log('Form is not valid');
            return;
        }

        if (isLoggingIn) {
            login({ username, password });
        } else {
            register({ username, email, password, image: imgFile });
        }

        clearForm();
        navigate('/restaurants');
    }

    return (
        <Box
            className={styles.background}>
            <Typography
                variant='h3'
                align='center'
                gutterBottom>
                {`Welcome ${isLoggingIn ? 'Back' : ''}`}
            </Typography>
            <Grid container spacing={14} justifyContent='center'>
                <Grid item>
                    <Box
                        className={styles.box}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    placeholder='Username'
                                    value={username}
                                    onChange={handleUsernameChange}
                                    onBlur={handleUsernameBlur}
                                    error={usernameHasError}
                                    helperText={usernameHasError && usernameErrorMessage} />
                                {!isLoggingIn &&
                                    <TextField
                                        placeholder='Email'
                                        value={email}
                                        onChange={handleEmailChange}
                                        onBlur={handleEmailBlur}
                                        error={emailHasError}
                                        helperText={emailHasError && emailErrorMessage} />}
                                <TextField
                                    placeholder='Password'
                                    type='password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onBlur={handlePasswordBlur}
                                    error={passwordHasError}
                                    helperText={passwordHasError && passwordErrorMessage} />
                                {!isLoggingIn &&
                                    <TextField
                                        placeholder='Confirm Password'
                                        type='password'
                                        value={password2}
                                        onChange={handlePassword2Change}
                                        onBlur={handlePassword2Blur}
                                        error={password2HasError}
                                        helperText={password2HasError && password2ErrorMessage} />}
                                <Button
                                    className={styles.submitBtn}
                                    type='submit'>
                                    {isLoggingIn ? 'Sign in' : 'Sign up'}
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Grid>
                {!isLoggingIn && <Grid item alignSelf='center'>
                    <ImageUpload
                        imgPreviewUrl={imgPreviewUrl}
                        handleImgChange={handleImgChange} />
                </Grid>}
            </Grid>
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    className={styles.qText}
                    variant='body2'>
                    {isLoggingIn ? 'Don\'t have an account?' :
                        'Already have an account?'}
                </Typography>
                {isLoggingIn && <Link
                    className={styles.link}
                    to='/signup'>
                    Sign up
                </Link>}
                {!isLoggingIn && <Link
                    className={styles.link}
                    to='/signin'>
                    Sign in
                </Link>}
            </Box>
        </Box >
    );
}

export default UserForm;