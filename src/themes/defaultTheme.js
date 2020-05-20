import hexToRGB from '../util/hexToRGB';

const defaultTheme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#2c5b67',
    secondary: '#668f9e',
    accent: '#1a363d',
    muted: '#f6f6f9',
    gray: '#dddddf',
    highlight: 'hsla(205, 100%, 40%, 0.125)'
  },
  fonts: {
    body: 'roboto, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    avatar: 48
  },
  radii: {
    default: 4,
    circle: 99999
  },
  shadows: {
    // card: '0 0 4px #2c5b67'
    card: `0 0 4px ${hexToRGB('#2c5b67', 0.6)}`
  },
  // rebass variants
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading'
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: [5, 6, 7]
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }
  },
  variants: {
    avatar: {
      width: 'avatar',
      height: 'avatar',
      borderRadius: 'circle'
    },
    card: {
      p: 2,
      bg: 'background',
      boxShadow: 'card'
    },
    link: {
      color: 'primary'
    },
    nav: {
      fontSize: 1,
      fontWeight: 'bold',
      display: 'inline-block',
      p: 2,
      color: 'inherit',
      textDecoration: 'none',
      '&:hover,&:focus,.active': {
        color: 'primary'
      }
    }
  },
  buttons: {
    primary: {
      fontSize: 1,
      fontWeight: 'bold',
      color: 'background',
      bg: 'primary',
      boxShadow: '0 2 4px rgba(0, 0, 0, .125)',
      '&:hover': {
        cursor: 'pointer',
        bg: 'accent'
      },
      '&:disabled': {
        bg: 'gray'
      }
    },
    outline: {
      variant: 'buttons.primary',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 2px',
      '&:hover': {
        cursor: 'pointer',
        color: 'background',
        bg: 'primary'
      }
    },
    secondary: {
      variant: 'buttons.primary',
      color: 'background',
      bg: 'secondary'
    }
  },
  alerts: {
    modal: {
      backgroundColor: 'background',
      color: 'text',
      margin: '0.5rem',
      position: 'absolute',
      left: '50%',
      top: '25%',
      transform: 'translate(-50%, -50%)'
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    }
  }
};

export default defaultTheme;
