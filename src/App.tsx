import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import {Button, Card, TextField} from '@material-ui/core'
import Sentence from './react/Sentence'
import Lines from './react/Lines'

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

  if (isThereSentence) {
    return (
      <div>
        <Sentence
        x={300}
        y={100}
        words={sentence}
        />
      </div>
    )
  } else {
    return (<Card className={classes.sentenceInput}>
      <TextField
      onChange={handleInput}></TextField>
      <Button
        onClick={handleClick}
      >Start</Button>
      <Lines/>
      </Card>
    )
  }
}



export default App
