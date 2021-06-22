import React, {useState} from 'react'
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
  },
  text: {
    padding: '10px 10px 10px 10px'
  }
})


export default function Phrase(props: PhraseProps) {
  const [bisectionIsActivated, setBisectionIsActivated] = useState(false)
  let positionXY = phrasePosition(props.x, props.y)
  const classes = useStyles()
  const wordArray = props.words.split(' ')
  return (
    <Card
      style={positionXY}
    >
      {wordArray.map((word, i) => {
        if (i < wordArray.length - 1) {
          return (
            <span className={classes.box}  key={i}>
              <Typography className={classes.text} component='span'>{word}</Typography>
              <button
                className={classes.button}
                onClick={() =>{branchHere(i, wordArray)}}
              >
                Ʌ
              </button>
            </span>
          )
        } else {
          return (
            <span key={i}>
              <Typography className={classes.text} component='span'>{word}</Typography>
            </span>
          )
        }
      })}
    </Card>
  )
}

interface PhraseProps {
  x: number;
  y: number;
  words: string;
}

function phrasePosition  (x: number, y:number)  {
  return {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`
  } as React.CSSProperties
}


function branchHere (i:number, phraseArray: string[]) {
  console.log(i)
  let rightSide = phraseArray.splice(i, phraseArray.length-1)
  
}