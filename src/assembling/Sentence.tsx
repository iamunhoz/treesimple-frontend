import React, {useState} from 'react'
import { Card, Typography, Button } from '@material-ui/core'
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


// sets the component that replicates itself with different children properties
interface PhraseOuterProps {
  x: number;
  y: number;
  words: string;
}
export default function PhraseOuter(props: PhraseOuterProps) {
  let positionXY = phrasePosition(props.x, props.y)
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
      <div className=''>
        <PhraseInner
          style={positionXY}
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
      </div>  
    )
  } else {
    return (
      <div className=''>
        <PhraseInner
          style={positionXY} 
          bisectFunction={setBisectionIsActivated}
          wordArray={wordArray}
          setLeftSide={setSideLeft}
          setRightSide={setSideRight}
          parentX={props.x}
          parentY={props.y}
        />

      </div>
  )}
}

// the internal html layout of a Phrase (text element, button to branch, phraseType Setter[todo]
interface PhraseInnerProps {
  bisectFunction: Function;
  style: React.CSSProperties;
  wordArray: string[];
  setLeftSide: Function;
  setRightSide: Function;
  parentX: number;
  parentY: number;
}
function PhraseInner(props: PhraseInnerProps) {
  const classes = useStyles()
  
  return (
    <Card>
      {props.wordArray.map((word, i) => {
        if (i < props.wordArray.length - 1) {
          return (
            <span className={classes.box}  key={i}>
              <Typography className={classes.text} component='span'>{word}</Typography>
              <Button
                className={classes.button}
                onClick={() => {
                  createBranchHere(
                    i,
                    props.wordArray,
                    props.bisectFunction,
                    props.setLeftSide,
                    props.setRightSide,
                    props.parentX,
                    props.parentY
                  )
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
function createBranchHere (
  i:number,
  phraseArray: string[],
  activateBisection: Function,
  setLeftSide: Function,
  setRightSide: Function,
  parentX: number,
  parentY: number
  ){
    let increment = 50
    let pixelPerChar = 5

    let leftSide = {
      words: phraseArray.slice(0,i+1).join(' '),
      x: parentX,
      y: parentY + increment
    }
    
    let rightSide = {
      words: phraseArray.slice(i+1).join(' '),
      x: parentX + (leftSide.words.length * pixelPerChar),
      y: parentY + increment
    }
    setLeftSide(leftSide)
    setRightSide(rightSide)
    activateBisection(true)
}

function phrasePosition  (x: number, y:number)  {
  return {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`
  } as React.CSSProperties
}


