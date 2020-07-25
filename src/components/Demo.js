import React from 'react'
import { 
  Container, Grid,
  Card, CardMedia, CardContent, CardActions,
  Button,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MDNBreakout from './MDNBreakout'

const useStyles = makeStyles({
  main: {
    padding: '30px',  
  },
});

export default function Showcase(props) {
  const classes = useStyles(props);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth={false} className={classes.main}>
      <Grid container spacing={2}>
        <Grid item key={"breakout"} xs={12} sm={6} md={4}>
          <Card className={classes.breakout}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h3">
                {"Breakout"}
              </Typography>
              {value === 'breakout' && <MDNBreakout/>}
            </CardContent>
            <CardActions>
              <Button onClick={(e)=>handleChange(e, 'breakout')}>Start</Button>
              <Button onClick={(e)=>handleChange(e, null)}>Stop</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
};
