import { createTheme } from '@mui/material/styles';


const muiTheme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    palette: {
        primary: {
            main: '#06b6d4',
            contrastText: "#fff"
        },
        secondary: {
            main: '#5b21b6',
            contrastText: "#fff"
        },
    }
});

export default muiTheme;
