import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f5d4', // neon cyan
    },
    secondary: {
      main: '#ff006e', // magenta
    },
    warning: {
      main: '#ffbe0b', // amber
    },
    success: {
      main: '#b8ff00', // lime
    },
    background: {
      default: '#0a0a0f',
      paper: '#1a1a2e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
  },
  typography: {
    fontFamily: "'Space Grotesk', sans-serif",
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: '#00f5d4',
            '& + .MuiSwitch-track': {
              backgroundColor: '#00f5d4',
              opacity: 0.5,
            },
          },
        },
        track: {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0a0a0f',
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

export default theme;
