import React, {useState, useEffect} from "react";
import {makeStyles, Paper} from '@material-ui/core'
import ContentBox from '../components/contentBox.js'

const styles =makeStyles({
  root: {
    width: '100%',
    maxWidth: 1000,
  },
  paper: {
    display: 'flex',
    padding: 10,
    // mrgin: '2vmax',
    width: '100%',
    maxWidth: '980px',
    position: 'relative'
  },
})

const Home = (props) => {

  const classes = styles()

  return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
            <ContentBox />
        </Paper>
    </div>
  )
}

export default Home;