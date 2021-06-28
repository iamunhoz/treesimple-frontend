import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import {Button, Card, TextField} from '@material-ui/core'
import Sentence from './assembling/Sentence'

const useStyles = makeStyles({
  outermostContainer: {
    backgroundBlendMode: 'lighten'
  },
  container: {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sentenceInput: {
    width: '50%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(220, 240, 220, 0.7)',
    backgroundBlendMode: 'lighten',
    color: '#fff'
  }
})

//Lines
const lineStyle = {
  stroke: 'rgb(255,0,0)',
  strokeWidth:'2'
}

const svgLayer:React.CSSProperties = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  zIndex: '-999'
}

interface lineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

//

function App() {
  const classes = useStyles()
  const [isThereSentence, setIsThereSentence] = useState(false)
  const [sentence, setSentence] = useState('pera uva salada mista arroz')
  const [lines, setLines] = useState<lineProps[]>([])
  
  const addLine = (newLineCoordinatesLeft:lineProps,newLineCoordinatesRight:lineProps) => {
    setLines([...lines, newLineCoordinatesLeft, newLineCoordinatesRight])
  }

  function handleClick() {
    setIsThereSentence(true)
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSentence(event.target.value)
  }

  if (isThereSentence) {
    return (
      <div className={classes.outermostContainer}>
        <svg style={svgLayer}>
          {lines.map((line, i) => {
            return  <line 
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      style={lineStyle}
                      key={i}
                    />
          })}
        </svg>
        <Button
          onClick={() => {
            setSentence('')
            setIsThereSentence(false)
          }}
        >Start Over</Button>
        <Sentence
        x={300}
        y={100}
        words={sentence}
        linesController={addLine}
        />
        <br/>
      </div>
    )
    } else {
    return (
    <div className={classes.container}>
      <Card className={classes.sentenceInput}>
        <TextField
          onChange={handleInput}
          defaultValue='pera uva salada mista arroz'
        ></TextField> <br/>
        <Button
          onClick={handleClick}
        >Start Branching</Button>
      </Card>
    </div>
    )
  }
}



export default App
