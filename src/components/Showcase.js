import React from 'react'
import { 
  Container, Grid,
  Paper, Card, CardMedia, CardContent, CardActions,
  Button,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MdViewer from './MdViewer'

// images
import img_sec from '../assets/prjcts/SEC.jpg'
import img_more from '../assets/prjcts/ORN.jpeg'
import img_dmmt from '../assets/prjcts/DMMT_logo.png'
import img_imrr from '../assets/prjcts/IMRR.png'
import img_RRwiki from '../assets/prjcts/RR_wiki.jpg'
import img_Classic from '../assets/prjcts/classicThesis_DEIB.png'
// other assets
import raspEnvPath from '../assets/prjcts/raspEnv.md'

const cards = [
  {
    title: 'IoT experiments',
    description: 'Envirophat, Raspberry pi0W and Google Cloud.',
    media: {
      image: null
    },
    actions: [
      {
        type: 'internal-link',
        text: 'HowTo',
        component: 'RaspEnvDashboard'
      },
      {
        type: 'external-link',
        href: 'https://datastudio.google.com/reporting/670292d3-73a2-4264-93ec-d03cb0052ee6',
        text: 'dashboard'
      }
    ]
  },
  {
    title: 'SEC negotiation protocol',
    description: 'Negotiation protocol to identify tradeoff among conflicting objectives. Matlab code available.',
    media: {
      image: img_sec,
      title: 'negotiation'
    },
    actions: [
      {
        type: 'article',
        doi: '10.1002/2017WR021431'
      },
      {
        type: 'code-github',
        repo: 'Lordmzn/evolving-tradeoffs',
      }
    ]
  },
  {
    title: 'Benefits of river restoration',
    description: 'Review of river restoration works across Western Europe to highlight multiple benefits on flood risk reduction and ecological status improvement.',
    media: {
      image: img_RRwiki,
      title: 'RR wiki logo'
    },
    actions: [
      {
        type: 'external-link',
        href: 'https://europe.wetlands.org/publications/benefits-european-river-restoration-schemes/',
        text: 'Published report'
      }
    ]
  },
  {
    title: 'MORE',
    description: 'Multi Objective Riverscape Evolution, previously known as MOGLE. A study of optimality in river erosional process. Since my master thesis.',
    media: {
      image: img_more,
      title: 'MORE'
    },
    actions: [
      {
        type: 'article',
        doi: '10.1029/2018WR022977'
      },
      {
        type: 'external-link',
        href: 'https://www.politesi.polimi.it/handle/10589/77182',
        text: 'thesis'
      }
    ]
  },
  {
    title: 'DMMT',
    description: 'Program to code equations of dynamic models and simulate them in a very fast way. Python and C++.',
    media: {
      image: img_dmmt,
      title: 'DMMT'
    },
    actions: [
      {
        type: 'code-github',
        repo: 'Lordmzn/pydmmt',
      }
    ]
  },
  {
    title: 'IMRR',
    description: 'The IMRR project aims at developing and promoting strategies for the sustainable management of the Red-Thai Binh Rivers System in Vietnam through coordinated decision-making and negotiation, supported by modelling and optimization tools and through capacity building of local authorities in the water sector.',
    media: {
      image: img_imrr,
      title: 'Loghi IMRR'
    },
    actions: [
      {
        type: 'external-link',
        href: 'http://xake.elet.polimi.it/imrr',
        text: 'project site'
      },
      {
        type: 'external-link',
        href: 'http://xake.elet.polimi.it/IMRR_Reports/D7.1Report.pdf',
        text: 'report'
      },
    ]
  },
  {
    title: 'Classic thesis @ DEIB',
    description: 'This is a latex template ready to be used when writing thesis at Politecnico di Milano IT department.',
    media: {
      image: img_Classic,
      title: 'Classic thesis LaTeX template for DEIB'
    },
    actions: [
      {
        type: 'code-github',
        repo: 'Lordmzn/ClassicThesis-at-DEIB/'
      }
    ]
  }
];

const useStyles = makeStyles({
  main: {
    padding: '30px',  
  }, // a style rule backgroundImage: img_background
});

export default function Showcase(props) {
  const classes = useStyles(props);

  const [activeStuff, setValue] = React.useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth={false} className={classes.main}>
      {activeStuff === 'grid' && 
      <Grid container spacing={2}>
        {cards.map(card => (
          <Grid item key={card.title} xs={6} sm={4} md={2}>
            <Card>
              <CardMedia
                component='img'
                image={card.media.image}
                title={card.media.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                  {card.title}
                </Typography>
                <Typography>
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                {card.actions.map((action, index) => (
                  {
                    'code-github': 
                      <Button 
                        key={index}
                        size="small" 
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={['fab', 'github']} />}
                        href={'https://github.com/' + action.repo} 
                        target='_blank'
                      >
                        code
                      </Button>,
                    'external-link':
                      <Button 
                        key={index}
                        size="small" 
                        color="primary"
                        startIcon={<FontAwesomeIcon icon='external-link-alt' />}
                        href={action.href} 
                        target='_blank'
                      >
                        {action.text}
                      </Button>,
                    'internal-link':
                      <Button
                        key={index}
                        size="small"
                        color="primary"
                        startIcon={<FontAwesomeIcon icon='paperclip' />}
                        onClick={e => handleChange(e, action.component)}
                      >
                        {action.text}
                      </Button>,
                    'article':
                      <Button
                        key={index}
                        size="small"
                        color="primary"
                        startIcon={<FontAwesomeIcon icon='pen-fancy' />}
                        href={'https://doi.org/' + action.doi}
                        target='_blank'
                      >
                        article
                      </Button>
                  }[action.type]
                ))}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    }
    {activeStuff === 'RaspEnvDashboard' &&
      <Paper>
        <MdViewer markdownPath={raspEnvPath} />
        <Button onClick={e => handleChange(e, 'grid')}>
          return to portfolio
        </Button>
      </Paper>
    }
    </Container>
  )
};
