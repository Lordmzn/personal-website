import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles({
  main: {
    padding: '30px',  
  }, // a style rule backgroundImage: img_background
});

export default function MdViewer(props) {
	
	const classes = useStyles(props);

	const [md, setValue] = React.useState(null);

	useEffect(() => {
    fetch(props.markdownPath).then((response) => response.text()).then((text) => {
      setValue(text)
    })
  });
  
  return (
  	<Container maxWidth={false} classes={classes.main}>
  		{md ? <ReactMarkdown source={md} /> : <div>Can't load the resource</div>}
  	</Container>
  )
};