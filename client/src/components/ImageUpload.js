import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles(theme => ({
    imageUpload: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBox: {
        height: '8rem',
        width: '9rem',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.grey[500]
    },
    pickImgBtn: {
        '&.MuiButton-root': {
            textTransform: 'none',
            margin: '1rem 0'
        }
    },
    img: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    }
}));

function ImageUpload(props) {
    const styles = useStyles();
    const { imgPreviewUrl, handleImgChange } = props;

    return (
        <Box className={styles.imageUpload}>
            <Box className={styles.imageBox}>
                {!!imgPreviewUrl &&
                    <img
                        className={styles.img}
                        src={imgPreviewUrl}
                        alt='' />}
                {!imgPreviewUrl &&
                    <Typography
                        variant='body2'
                        color='text.secondary'>
                        Please pick an image
                    </Typography>}
            </Box>
            <Button
                className={styles.pickImgBtn}
                variant='contained'
                size='small'
                component='label'>
                Pick Image
                <input
                    type='file'
                    accept='.jpg,.jpeg,.png'
                    onChange={handleImgChange}
                    hidden />
            </Button>
        </Box>
    );
}

export default ImageUpload;