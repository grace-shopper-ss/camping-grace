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
    MuiListItem: {
      styleOverrides: {
        root: {
          justifyContent: 'center',
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontWeight: "200",
          fontSize: "1em",
          textAlign: 'center',
          justifyContent: 'center',        }
      },
      variants: [
        {
          props: { variant: 'menuSubItem' },
          style: {
            "& span": {
              fontWeight: "200",
              fontSize: '1em',
              textAlign: 'center',
          }
          }
        }
      ]
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          justifyConent: 'center',
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
            marginTop: '45%',
            borderRadius: '25px',
            '&:focus': {              
              color: 'black',
            }
          }
        },
        {
          props: { variant: 'auth-button' },
          style: {
            fontWeight: "bold",            
            textTransform: 'none',              
            margin: '1em',
            color: '#fdfdf2',
            backgroundColor: '#1C2541 !important'
          }
        },
        {
          props: { variant: 'cartButton' },
          style: {
            fontWeight: "bold",            
            textTransform: 'none',              
            margin: '1em',
            color: '#fdfdf2',
            backgroundColor: '#1C2541 !important',
            width: '75%'
          }
        },
        {
          props: { variant: 'menuList' },
          style: {
            fontWeight: '100',            
            textTransform: 'none',              
            paddingTop: '0',
            paddingBottom: '0',
            color: '#fdfdf2',
            backgroundColor: '#1C2541 !important',
            width: '75%'
          }
        }
      ]

    },
  }
});


export default theme