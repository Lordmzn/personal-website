import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  main: {
    padding: '30px',  
  }, // a style rule backgroundImage: img_background
});

export default function DataStories(props) {
  const classes = useStyles(props);
  return (
  	<div className={classes.main}>  		
  	</div>
  )
};