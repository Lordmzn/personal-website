import React from 'react';
import { 
  CssBaseline, 
  AppBar, Toolbar, Tabs, Tab,
  IconButton, Typography, Link
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Showcase from './components/Showcase';

// assets
import cv from "./assets/cv_EmanueleMason.pdf"
import img_background from './assets/background.jpg'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faExternalLinkAlt, faPenFancy, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
library.add(fab, faExternalLinkAlt, faPenFancy, faSquare)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: fade('#f57f17', 0.85),
      contrastText: '#fafafa',
    },
    secondary: {
      main: fade('#689f38', 0.55),
      contrastText: '#fafafa',
    },
    typography: {
      fontFamily: [
        '"Nunito"', 
        '"Helvetica Neue"', 
        'sans-serif'
      ].join(','),
      fontSize: 10,
    },
    text: {
      primary: fade('#fcfcfc', 0.95),
      secondary: fade('#ececec', 0.95),
    },
    background: {
      paper: fade('#4f2600', 0.65),
      default: fade('#683000', 0.65),
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: 'url(' + img_background + ')',
          backgroundPosition: 'left top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          height: '100%'
        }
      }
    }
  }
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.lordmzn.it/">
        Lordmzn.it
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    display: 'flex'
  },
  content: {
    minWidth: "100vw",
    minHeight: "83vh" 
  },
  library: {
    backgroundColor: fade('#ffffff', 0.75),
  },
  footer: {
    marginTop: 'auto',
    padding: '10px',
    display: 'flex',
    backgroundColor: fade('#4f2600', 0.65),
  },
  footerItem: {
    margin: '0px 30px'
  }
});

export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  // https://scholar.google.it/citations?hl=it&user=MSo2pEEAAAAJ
  return (
     <ThemeProvider theme={theme}>
     <div className={classes.root}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">
            <Link color="inherit" href="https://en.wikipedia.org/wiki/List_of_hexagrams_of_the_I_Ching#Hexagram_10">
              ䷉ 履
            </Link>
            {' '} Personal website of Emanuele Mason
          </Typography>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Portfolio" {...a11yProps(0)} />
            <Tab label="Biography" {...a11yProps(1)} />
            <Tab label="Library" {...a11yProps(2)} />
          </Tabs>
          <IconButton
            color="inherit"
            href='https://www.linkedin.com/in/emanuele-mason-a182112a/'
            target='_blank'
          >
            <FontAwesomeIcon icon={['fab', 'linkedin']} size="lg"/>
          </IconButton>
          <IconButton
            color="inherit"
            href='https://www.researchgate.net/profile/Emanuele_Mason'
            target='_blank'
          >
            <FontAwesomeIcon icon={['fab', 'researchgate']} size="lg"/>
          </IconButton>
          <IconButton
            color="inherit"
            href='https://scholar.google.it/citations?hl=it&user=MSo2pEEAAAAJ'
            target='_blank'
          >
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon icon="square" size="lg"/>
              <FontAwesomeIcon icon={['fab', 'google']} style={{color:"RoyalBlue"}}/>
            </span>
          </IconButton>
          <IconButton
            color="inherit"
            href='https://github.com/Lordmzn'
            target='_blank'
          >
            <FontAwesomeIcon icon={['fab', 'github-square']} size="lg"/> 
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        {
          [0, 1, 2].map(index =>
            <Typography
              component="div"
              role="tabpanel"
              hidden={value !== index}
              id={`simple-tabpanel-${index}`}
              aria-labelledby={`simple-tab-${index}`}
              className={classes.content}
            >
              {value === index && {
                0: <Showcase />,
                1: <embed src={cv} type="application/pdf" width="100%" height="100%" />,
                2: <embed 
                    width="100%" height="100%" className={classes.library}
                    src="http://bibbase.org/show?bib=http://bibbase.org/zotero/LordMzn"
                  >
                  </embed>
              }[value]}
            </Typography>
          )
        }
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <div className={classes.footerItem}>
          <Typography variant="h6" align="center" gutterBottom>
            道可道 非常道
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            名可名 非常名
          </Typography>
        </div>
        <div className={classes.footerItem}>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            {'Made with ❤ and some sweat & tears too. '}
            <Link color="inherit" href="https://github.com/Lordmzn/personal-website">
              Fork me on GitHub!
            </Link>
          </Typography>
          <Copyright />
        </div>
      </footer>
      {/* End footer */}
    </div>
    </ThemeProvider>
  );
}
