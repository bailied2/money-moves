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
        },
      });
  
export default theme;