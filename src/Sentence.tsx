import React, {useState} from 'react'
import { Card, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import PhraseTypePing from './PhraseTypePin'
import './fonts.css'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red'
  },
  button: {
    display: 'inline',
    fontSize: '10px',
    color: 'rgba(200,200,200,0.3)',
    minWidth: '0',
    width: '5px',
    height: '100%',
    padding: '10px 0 0 0',
    border: '0',
    '&:hover':{
      backgroundColor: '#39A9CB'
    }
  },
  box: {
    color: 'black'
  },
  text: {
    padding: '10px 10px 10px 10px',
    fontFamily: 'Josefin Sans'
  },
  phraseBox: {
    maxWidth: 'fit-content',
    border: '3px solid #39A9CB',
    overflow: 'visible'
  }
})

function createBranchHere (
  i:number,
  phraseArray: string[],
  activateBisection: Function,
  setLeftSide: Function,
  setRightSide: Function,
  parentX: number,
  parentY: number,
  drawLines: Function,
  linesController: Function,
  disableButtons: Function
  ){
    const incrementY = 100
    const leftSide = {
      words: phraseArray.slice(0,i+1).join(' '),
      x: 0,
      y: parentY + incrementY
    }
    leftSide.x = parentX - (55 + leftSide.words.length*11)
    
    const estimatedLeftBlockSize = (leftSide.words.length*13)+(phraseArray.slice(0,i+1).length*5)

    const rightSide = {
      words: phraseArray.slice(i+1).join(' '),
      x: parentX + (55 + leftSide.words.length*3),
      y: parentY + incrementY
    }
    const estimatedRightBlockSize = (rightSide.words.length*10)+(phraseArray.slice(i+1).length*5)
    const lineIncrementY = 24
    linesController({
      x1:parentX,
      y1:parentY + lineIncrementY,
      x2:leftSide.x+(estimatedLeftBlockSize/2),
      y2:leftSide.y
    },{
      x1:parentX,
      y1:parentY + lineIncrementY,
      x2:rightSide.x+(estimatedRightBlockSize/2),
      y2:rightSide.y
    })

    setLeftSide(leftSide)
    setRightSide(rightSide)
    activateBisection(true)
    drawLines(false)
    disableButtons(true)
}

function phrasePosition  (x: number, y:number)  {
  return {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    border: '2px solid whte'
  } as React.CSSProperties
}

// sets the component that replicates itself with different children properties
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
          linesController={props.linesController}
        />
        <PhraseOuter
          x={sideLeft.x}
          y={sideLeft.y}
          words={sideLeft.words}
          linesController={props.linesController}
        />
        <PhraseOuter
          x={sideRight.x}
          y={sideRight.y}
          words={sideRight.words}
          linesController={props.linesController}
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
          linesController={props.linesController}
        />
  )}
}

// the internal html layout of a Phrase (text element, button to branch, phraseTypePin
function PhraseInner(props: PhraseInnerProps) {
  let positionXY = phrasePosition(props.parentX, props.parentY)
  const classes = useStyles()
  const [isBranched, setIsBranched] = useState(false)
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false)
  const midX = props.wordArray.join('').length*4 + ((props.wordArray.length-1) * 10)
  
  return (
    <Card 
      className={classes.phraseBox}
      style={positionXY}
    >
    <PhraseTypePing X={midX}/>
    {props.wordArray.map((word, i) => {
      if (i < props.wordArray.length - 1) {
        return (
          <span className={classes.box}  key={i}>
            <Typography className={classes.text} component='span'>{word}</Typography>
            <Button
              className={classes.button}
              disabled={areButtonsDisabled}
              onClick={(event) => {createBranchHere(
                                              i,
                                              props.wordArray,
                                              props.bisectFunction,
                                              props.setLeftSide,
                                              props.setRightSide,
                                              event.clientX,
                                              props.parentY,
                                              setIsBranched,
                                              props.linesController,
                                              setAreButtonsDisabled)
              }}
            >
              Ʌ
            </Button>
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

interface PhraseInnerProps {
  bisectFunction: Function;
  wordArray: string[];
  setLeftSide: Function;
  setRightSide: Function;
  parentX: number;
  parentY: number;
  linesController: Function;
}

interface PhraseOuterProps {
  x: number;
  y: number;
  words: string;
  linesController: Function;
}