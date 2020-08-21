import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  main: {
    padding: '30px',  
  }, // a style rule backgroundImage: img_background
});

export default function RaspEnvDashboard(props) {
	
	const classes = useStyles(props);
  
  return (
  	<Paper className={classes.main}>  		
  	</Paper>
  )
};