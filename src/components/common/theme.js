import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
  },
});

export default theme;
