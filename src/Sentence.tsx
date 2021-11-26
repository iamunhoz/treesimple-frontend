import React, {useState, useEffect} from 'react'
import { Card, Typography, Button } from '@material-ui/core'
import PhraseTypePin from './PhraseTypePin'
import { useStyles } from './styles/SentenceStyles'
import './fonts.css'

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
    
    const estimatedLeftBlockSize = (leftSide.words.length*10)+(phraseArray.slice(0,i+1).length*5)

    const rightSide = {
      words: phraseArray.slice(i+1).join(' '),
      x: parentX + (55 + leftSide.words.length*3),
      y: parentY + incrementY
    }
    const estimatedRightBlockSize = (rightSide.words.length*10)+(phraseArray.slice(i+1).length*5)
    const lineIncrementY = 30
    linesController({
      x1:parentX-3,
      y1:parentY + lineIncrementY,
      x2:leftSide.x+(estimatedLeftBlockSize/2),
      y2:leftSide.y
    },{
      x1:parentX-3,
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
  const [uniqueID,setUniqueID] = useState(`${Math.floor(Math.random() * 10000)}`)
  let positionXY = phrasePosition(props.parentX, props.parentY)
  const classes = useStyles()
  const [isBranched, setIsBranched] = useState(false)
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false)
  const [pinX, setPinX] = useState(0)
  
  useEffect(() => {
    const card = document.getElementById(uniqueID)
    if (card) {
    setPinX(props.parentX - 10 + card.clientWidth / 2)}
  }, [])
  
  return (<>
    <PhraseTypePin X={pinX} Y={props.parentY}/>
    <Card
      id={uniqueID}
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
  </>)
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