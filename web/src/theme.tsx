import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#F35061',
    },
    secondary: {
      main: '#F50057',
    },
    error: {
      main: '#d32f2f',
    },
  },
});

export default theme;
