import { createTheme } from '@mui/material/styles';
import { lighten, darken } from '@mui/system';


const backgroundColor='#08415c';

const theme = createTheme({
    
        palette: {
          background: {
            default: "#08415c", // You can keep your original background color here
          },
          text: {
            primary: '#EADCD7',
          },
          
        },
        typography: {
          fontFamily: '"Cabin", sans-serif',
          fontSize: 20,
          fontWeightRegular: 200,
          letterSpacing: 0,
        },
        components: {
          // Override MUI Card component styles globally
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: "#FA7921", // Global background color for all cards
              },
            },
          },
          MuiLink: {
            styleOverrides: {
              root: {
                color: '#1976d2', // Default link color
                // textDecoration: 'none',
      
                '&:hover': {
                  color: '#1565c0', // Hover color
                  textDecoration: 'underline',
                },
      
                '&:visited': {
                  color: '#6a1b9a', // Visited link color (optional)
                },
      
                '&:active': {
                  color: '#d32f2f', // Active link color (optional)
                },
              },
            },
          },
        },
      });
  
export default theme;