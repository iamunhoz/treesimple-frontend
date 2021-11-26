import React, {useState} from 'react'
import {Button, Card, TextField} from '@material-ui/core'
import Sentence from './Sentence'
import TopAppBar from './TopAppBar'
import { useStyleApp, lineStyle } from './styles/globalStyle'

function App() {
  const classes = useStyleApp()
  const [isThereSentence, setIsThereSentence] = useState(false)
  const [sentence, setSentence] = useState('Colorless green ideas sleep furiously')
  const [lines, setLines] = useState<lineProps[]>([])
  
  const addLine = (newLineCoordinatesLeft:lineProps,newLineCoordinatesRight:lineProps) => {
    setLines([...lines, newLineCoordinatesLeft, newLineCoordinatesRight])
  }

  const handleClick = () => {
    setSentence(sentence.split(' ').filter(n => n).join(' '))
    setIsThereSentence(true)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSentence(event.target.value)
  }

  const restart = () => {
    setSentence('')
    setIsThereSentence(false)
    setLines([])
  }

  return (<>
    <TopAppBar restart={restart} isThereSentence={isThereSentence}/>
    {isThereSentence ?
      <div className={classes.containerWithSentence}>
        <svg className={classes.svgLayer}>
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
        
        <Sentence
        x={parent.innerWidth/2 - ((sentence.length/2) * 10)}
        y={100}
        words={sentence}
        linesController={addLine}
        />
        <br/>
      </div>
    :
      <div className={classes.containerWithoutSentence}>
        <div className={classes.centerBox}>
          <Card className={classes.sentenceInput}>
            <TextField
              className={classes.textField}
              margin="normal"
              fullWidth
              onChange={handleInput}
              placeholder='Write your sentence here'
            ></TextField>
          </Card>
          <Button
            className={classes.branchBtn}
            variant="contained"
            onClick={handleClick}
            disabled={sentence == ''}
          >
            Start Branching
          </Button>
        </div>
        <h5 className={classes.author}>by Ivã Munhoz</h5>
      </div>}
    </>
  )
}

export default App

interface lineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
