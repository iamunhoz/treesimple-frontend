import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import {Button, Card, TextField} from '@material-ui/core'
import Sentence from './assembling/Sentence'
import Lines from './assembling/Lines'

const useStyles = makeStyles({
  sentenceInput: {
    width: '50%',
    margin: '0 auto'
  }
})

function App() {
  const classes = useStyles()
  const [isThereSentence, setIsThereSentence] = useState(false)
  const [sentence, setSentence] = useState('')
  
  function handleClick() {
    setIsThereSentence(true)
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSentence(event.target.value)
  }

  //TODO calcPosition(x,y)
  if (isThereSentence) {
    return (
      <div className={'startOfEverything'}>
        <Sentence
        x={300}
        y={100}
        words={sentence}
        />
        <br/>
        <Button
          onClick={() => {
            setSentence('')
            setIsThereSentence(false)
          }}
        >Start Over</Button>
      </div>
    )
    } else {
    return (<Card className={classes.sentenceInput}>
      <TextField
      onChange={handleInput}></TextField>
      <Button
        onClick={handleClick}
      >Start Branching</Button>
      <Lines/>
      </Card>
    )
  }
}



export default App
