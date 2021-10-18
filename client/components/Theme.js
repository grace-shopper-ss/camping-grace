import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#173836',
      contrastText: '#fffcf1',
    },
    secondary: {
      main: '#1f8a70',
    },
    background: {
      default: '#e9e9e9',
      primary: '#e9e9e9',
      paper: '#ffffff',
    },
    success: {
      main: '#1F8A70',
    },
    text: {
      primary: '#313131',
    },
    info: {
      main: '#bf820f',
    },
  },
  typography: {
    fontWeightLight: 400,
    fontWeightRegular: 500,
  },
});


export default theme