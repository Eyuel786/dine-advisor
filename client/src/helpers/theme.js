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
            fontFamily: 'Poppins',
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '1rem',
        }
    }
});