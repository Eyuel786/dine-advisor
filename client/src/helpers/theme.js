import { createTheme } from '@mui/material';


const blue = '#0B72B9';

export const theme = createTheme({
    palette: {
        common: {
            blue
        },
        primary: {
            main: '#000'
        },
        secondary: {
            main: blue
        }
    },
    typography: {
        tab: {
            color: '#000',
            fontFamily: 'Raleway',
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '1rem',
        },
        logo: {
            fontFamily: 'Pacifico',
            fontSize: '2.5rem',
        },
        h3: {
            fontFamily: 'Raleway',
            fontSize: '2rem',
            fontWeight: 700
        },
        h4: {
            fontFamily: 'Raleway',
            fontSize: '1.2rem',
            fontWeight: 700
        },
        canvas: {
            backgroundColor: '#f4f4f8',
            minHeight: '100vh',
            padding: '1rem 6rem',
        }
    }
});