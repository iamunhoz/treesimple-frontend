import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import {Button, Card, TextField} from '@material-ui/core'
import Sentence from './assembling/Sentence'
import Lines from './assembling/Lines'

const useStyles = makeStyles({
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
    flexDirection: 'column'
  }
})

function App() {
  const classes = useStyles()
  const [isThereSentence, setIsThereSentence] = useState(false)
  const [sentence, setSentence] = useState('pera uva salada mista arroz')
  
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
