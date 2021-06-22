import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root:{
    display: 'flex'
  },
  crossed: {
    background: 'linear-gradient(to top left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) calc(50% - 0.8px), rgba(0,0,0,1) 50%, rgba(0,0,0,0) calc(50% + 0.8px), rgba(0,0,0,0) 100%)',
    width: '100px',
    height: '100px'
  },
  crossedR: {
    background: 'linear-gradient(to top right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) calc(50% - 0.8px), rgba(0,0,0,1) 50%, rgba(0,0,0,0) calc(50% + 0.8px), rgba(0,0,0,0) 100%)',
    width: '100px',
    height: '100px'
  }
})

export default function Lines(){
  const classes = useStyles()

  return(
    <div className={classes.root}>
      <div className={classes.crossed}></div>
      <div className={classes.crossedR}></div>
    </div>
  )
}