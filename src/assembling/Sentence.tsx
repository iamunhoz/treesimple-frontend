import React, {useState} from 'react'
import { Card, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Lines from './Lines'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red'
  },
  button: {
    display: 'inline',
    fontSize: '10px',
    color: '#aaa',
    minWidth: '0',
    width: '5px',
    height: '100%',
    padding: '0 0 0 0',
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
  },
  phraseBox: {
    maxWidth: 'fit-content'
  }
})


// sets the component that replicates itself with different children properties
interface PhraseOuterProps {
  x: number;
  y: number;
  words: string;
}
export default function PhraseOuter(props: PhraseOuterProps) {
  const classes = useStyles()
  const wordArray = props.words.split(' ')

  const [bisectionIsActivated, setBisectionIsActivated] = useState(false)
  const [sideLeft, setSideLeft] = useState({
    words: '',
    x: 0,
    y: 0
  })
  const [sideRight, setSideRight] = useState({
    words: '',
    x: 0,
    y: 0
  })

  if (bisectionIsActivated) {
    return (
      <>
        <PhraseInner
          bisectFunction={setBisectionIsActivated}
          wordArray={wordArray}
          setLeftSide={setSideLeft}
          setRightSide={setSideRight}
          parentX={props.x}
          parentY={props.y}
        />
        <PhraseOuter
          x={sideLeft.x}
          y={sideLeft.y}
          words={sideLeft.words}
        />
        <PhraseOuter
          x={sideRight.x}
          y={sideRight.y}
          words={sideRight.words}
        />
      </>  
    )
  } else {
    return (
        <PhraseInner
          bisectFunction={setBisectionIsActivated}
          wordArray={wordArray}
          setLeftSide={setSideLeft}
          setRightSide={setSideRight}
          parentX={props.x}
          parentY={props.y}
        />
  )}
}

// the internal html layout of a Phrase (text element, button to branch, phraseType Setter[todo]
interface PhraseInnerProps {
  bisectFunction: Function;
  wordArray: string[];
  setLeftSide: Function;
  setRightSide: Function;
  parentX: number;
  parentY: number;
}
function PhraseInner(props: PhraseInnerProps) {
  let positionXY = phrasePosition(props.parentX, props.parentY)
  const classes = useStyles()
  const [isBranched, setIsBranched] = useState(false)
  
  return (
    <Card 
      className={classes.phraseBox}
      style={positionXY}
      >
      {props.wordArray.map((word, i) => {
        if (i < props.wordArray.length - 1) {
          return (
            <span className={classes.box}  key={i}>
              <Typography className={classes.text} component='span'>{word}</Typography>
              <Button
                className={classes.button}
                onClick={(event) => {createBranchHere(
                                                i,
                                                props.wordArray,
                                                props.bisectFunction,
                                                props.setLeftSide,
                                                props.setRightSide,
                                                event.clientX,
                                                props.parentY,
                                                setIsBranched)
                }}
              >
                Ʌ
              </Button>
              <Lines visibility={isBranched}/>
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
function createBranchHere (
  i:number,
  phraseArray: string[],
  activateBisection: Function,
  setLeftSide: Function,
  setRightSide: Function,
  parentX: number,
  parentY: number,
  drawLines: Function
  ){
    const incrementY = 100
    const leftSide = {
      words: phraseArray.slice(0,i+1).join(' '),
      x: 0,
      y: parentY + incrementY
    }
    leftSide.x = parentX - (55 + leftSide.words.length*11)
    const rightSide = {
      words: phraseArray.slice(i+1).join(' '),
      x: parentX + (55 + leftSide.words.length*3),
      y: parentY + incrementY
    }

    setLeftSide(leftSide)
    setRightSide(rightSide)
    activateBisection(true)
    drawLines(false)
}

function phrasePosition  (x: number, y:number)  {
  return {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    border: '2px solid whte'
  } as React.CSSProperties
}


