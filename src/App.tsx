import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import {Button, Card, TextField} from '@material-ui/core'
import Sentence from './Sentence'
import TopAppBar from './TopAppBar'


const useStyles = makeStyles({
  containerWithSentence: {
    backgroundBlendMode: 'lighten'
  },
  containerWithoutSentence: {
    height: '99vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sentenceInput: {
    width: '50%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: '10px',
    paddingRight: '10px',
    border: '3px solid #39A9CB'
  },
  textField: {
    "& .MuiInputBase-input":{
    textAlign: "center"}
  },
  author: {
    color: '#ccc',
    WebkitTextStrokeWidth: '1px',
    WebkitTextStrokeColor: '#39A9CB'
  },
  branchBtn: {
    backgroundColor: '#2940D3',
    color: 'white',
    maxWidth: 'fit-content',
    marginTop: '10px'
  },
  centerBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

//Lines
const lineStyle = {
  stroke: '#39A9CB',
  strokeWidth:'2'
}

const svgLayer:React.CSSProperties = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  zIndex: -999
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
  const [sentence, setSentence] = useState('Colorless green ideas sleep furiously')
  const [lines, setLines] = useState<lineProps[]>([])
  
  const addLine = (newLineCoordinatesLeft:lineProps,newLineCoordinatesRight:lineProps) => {
    setLines([...lines, newLineCoordinatesLeft, newLineCoordinatesRight])
  }

  function handleClick() {
    setSentence(sentence.split(' ').filter(n => n).join(' '))
    setIsThereSentence(true)
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSentence(event.target.value)
  }

  function restart() {
    setSentence('')
    setIsThereSentence(false)
    setLines([])
  }
  if (isThereSentence) {
    return (
      <div className={classes.containerWithSentence}>
        <TopAppBar restart={restart} isThereSentence={isThereSentence}/>
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
        
        <Sentence
        x={parent.innerWidth/3}
        y={100}
        words={sentence}
        linesController={addLine}
        />
        <br/>
      </div>
    )
    } else {
    return (
    <div className={classes.containerWithoutSentence}>
      <TopAppBar restart={restart} isThereSentence={isThereSentence}/>
      <div className={classes.centerBox}>
        <Card className={classes.sentenceInput}>
          <TextField
            className={classes.textField}
            margin="normal"
            fullWidth
            onChange={handleInput}
            defaultValue='Colorless green ideas sleep furiously'
          ></TextField>
        </Card>
        <Button
          className={classes.branchBtn}
          variant="contained"
          onClick={handleClick}
        >
          Start Branching
        </Button>
      </div>
      <h5 className={classes.author}>by Ivã Munhoz</h5>
    </div>
    )
  }
}

export default App
