import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  main: {
    padding: '30px',  
  }, // a style rule backgroundImage: img_background
});

export default function RaspEnvDashboard(props) {

	useEffect(() => {
		// this is taken directly from Google documentation:
    // https://developers.google.com/api-client-library/javascript/start/start-js
    function start() {
      // 2. Initialize the JavaScript client library.
      window.gapi.client.init({
        'apiKey': 'AIzaSyCfnIUL9rHLOanmzh-ec-bpo3m3xTFlhQg',
        // clientId and scope are optional if auth is not required.
        'clientId': '982365141836-hopq4se2aj4utb9f467nu0sro9csdts6.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/bigquery.readonly',
        'discoveryDocs': ['https://bigquery.googleapis.com/discovery/v1/apis/bigquery/v2/rest']
      }).then(function() {
        // 3. Initialize and make the API request.
        return window.gapi.client.bigquery.tabledata.list({
        	'projectId': 'rasp-sensor-271912',
        	'datasetId': 'enviro_dataset',
          'tableId': 'raw_float_data',
          'maxResults': 2
        })
      }).then(function(response) {
        console.log(response.result);
      }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
      });
    };
    // 1. Load the JavaScript client library.
    window.gapi.load('client', start);
	});
	
	const classes = useStyles(props);
  
  return (
  	<Paper className={classes.main}>  		
  	</Paper>
  )
};