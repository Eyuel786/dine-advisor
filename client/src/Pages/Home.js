import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';


const useStyles = makeStyles(theme => ({
    home: {
        backgroundColor: '#f4f4f8',
        minHeight: '100vh',
        padding: '0 6rem'
    }
}));

function Home() {
    const styles = useStyles();

    return (
        <Box className={styles.home}>
            OKKK
        </Box>
    );
}

export default Home;
