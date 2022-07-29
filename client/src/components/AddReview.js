import React, { useState } from 'react';
import {
    Stack, TextField, Rating, Typography, Button, Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';

import { validateTitle, validateComment } from '../validators/validateReview';
import { useInputState } from '../hooks/useInputState';
import { sendNewReview } from '../store';


const useStyles = makeStyles(theme => ({
    addReview: {
        width: '24rem',
        backgroundColor: '#fff',
        padding: '1rem',
        marginBottom: '2rem'
    },
    title: {
        '&.MuiTypography-root': {
            marginBottom: '1rem'
        }
    },
    submitBtn: {
        '&.MuiButton-root': {
            ...theme.typography.btn,
            margin: '1rem 0 0',
            '&:hover': {
                backgroundColor: theme.palette.primary.light
            }
        }
    }
}));

function AddReview(props) {
    const styles = useStyles();
    const dispatch = useDispatch();
    const { id } = props;

    const [rating, setRating] = useState(1);

    const {
        enteredValue: title,
        inputIsValid: titleIsValid,
        inputHasError: titleHasError,
        errorMessage: titleErrorMessage,
        handleChange: handleTitleChange,
        handleBlur: handleTitleBlur,
        reset: resetTitle
    } = useInputState('', validateTitle);

    const {
        enteredValue: comment,
        inputIsValid: commentIsValid,
        inputHasError: commentHasError,
        errorMessage: commentErrorMessage,
        handleChange: handleCommentChange,
        handleBlur: handleCommentBlur,
        reset: resetComment
    } = useInputState('', validateComment);

    const formIsValid = titleIsValid && commentIsValid;

    const handleRatingChange = (e, newVal) => setRating(newVal);

    const clearForm = () => {
        setRating(1);
        resetTitle();
        resetComment();
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!formIsValid) {
            console.log('Review form is not valid');
            return;
        }

        dispatch(sendNewReview(id, { rating, title, comment }));

        clearForm();
    }

    return (
        <Box className={styles.addReview}>

            <Typography
                variant='h4'
                align='center'
                className={styles.title}>
                Write your review
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Box>
                        <Typography
                            component='legend'>
                            Rating
                        </Typography>
                        <Rating
                            value={rating}
                            onChange={handleRatingChange} />
                    </Box>
                    <TextField
                        placeholder='Title'
                        value={title}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        error={titleHasError}
                        helperText={titleHasError && titleErrorMessage} />
                    <TextField
                        placeholder='Comment'
                        value={comment}
                        onChange={handleCommentChange}
                        onBlur={handleCommentBlur}
                        error={commentHasError}
                        helperText={commentHasError && commentErrorMessage}
                        rows={3}
                        multiline />
                </Stack>
                <Button
                    size='small'
                    variant='contained'
                    type='submit'
                    className={styles.submitBtn}>
                    Submit
                </Button>
            </form>

        </Box>
    );
}

export default AddReview;