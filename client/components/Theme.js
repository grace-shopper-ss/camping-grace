import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#173836',
      contrastText: '#fffcf1',
    },
    secondary: {
      main: '#616161',
      alt: 'transparent',
    },
    background: {
      default: '#e4e4e4',
      primary: '#e9e9e9',
      paper: '#ffffff',
      card: '#7e7e49ee',
    },
    success: {
      main: '#1F8A70',
    },
    text: {
      primary: '#303030',
      secondary: '#303030'
    },
    alternateTextColor: {
      primary: '#303030',
    },
    info: {
      // main: '#bf820f',
      main: '#CF5034',
    },
    login: {
      primary: '#1C2541',
    }
  },
  typography: {
    fontWeightLight: 400,
    fontWeightRegular: 800,
  },
  components: {
    AppBar: {
      root: {
        style: {
          color: '303030',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: '150ms ease-in-out',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',         
        }
      },
      variants: [
        {
          props: { variant: 'cta' },
          style: {
            fontWeight: "bold",            
            color: 'transparent',
            '&:focus': {              
              color: 'black',
              background: 'white'
            }
          }
        },
        {
          props: { variant: 'cta-alt' },
          style: {
            fontWeight: "bold",            
            textTransform: 'none',              
            color: 'transparent',
            marginTop: '3em',
            '&:focus': {              
              color: 'black',
              textDecoration: 'underline',
            }
          }
        },
        {
          props: { variant: 'auth-button' },
          style: {
            fontWeight: "bold",            
            textTransform: 'none',              
            margin: '1em',
            color: '#1C2541 !important',
            backgroundColor: '#1C2541 !important'
          }
        }
      ]

    },
  }
});


export default theme