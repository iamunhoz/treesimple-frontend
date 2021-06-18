import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red'
  },
  button: {
    display: 'inline',
    border: '0',
    '&:hover':{
      backgroundColor: 'yellow'
    }
  },
  box: {
    color: 'black'
  }
})

const phrasePosition = (x: number, y:number) => {
  return {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`
    } as React.CSSProperties
  }

const branchHere = (event) => {console.log(event)}

interface PhraseProps {
  x: number;
  y: number;
  words: string[];
}

export default function Phrase(props: PhraseProps) {
  let positionXY = phrasePosition(props.x, props.y)
  const classes = useStyles()
  return (
    <Card
      style={positionXY}
    >
      {props.words.map((word, i) => {
        if (i < props.words.length - 1) {
          return (<span className={classes.box}  key={i}>
              <Typography component='span'>{word}</Typography>
              <button
                className={classes.button}
                onClick={branchHere}
              >
                Ʌ
              </button>
              
          </span>)
        } else {
          return (
            <span key={i}>
              <Typography component='span'>{word}</Typography>
             </span>)
        }
      })}
    </Card>
  )
}