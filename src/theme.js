// import { createTheme } from '@mui/material/styles'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { red } from '@mui/material/colors'

const APP_BAR_HEIGTH = '58px'
const BOARD_BAR_HEIGTH = '60px'
const BOARD_CONTENT_HEIGTH = `calc( 100vh - ${APP_BAR_HEIGTH} - ${BOARD_BAR_HEIGTH} )`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGTH,
    boardBarHeight: BOARD_BAR_HEIGTH,
    boardContentHeight: BOARD_CONTENT_HEIGTH,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  colorSchemes: {
    light: {
      // palette: {
      //   primary: {
      //     main: '#C84B31'
      //   },
      //   secondary: { 
      //     main: '#FFA732'
      //   }
      // }
    },
    dark: {
      // palette: {
      //   primary: {
      //     main: '#99627A'
      //   },
      //   secondary: {
      //     main: '#EEF5FF'
      //   }
      // }
    }
  },
  // ..orther properties
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white',
            borderRadius: '8px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': { borderWidth: '0.5px' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': { borderWidth: '0.5px !important' },
          '&:hover fieldset': { borderWidth: '1px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1px !important' }
        }
      }
    }
  }
  // ...other properties
})

export default theme
