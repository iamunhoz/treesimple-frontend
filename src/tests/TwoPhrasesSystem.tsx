import React, {useState} from 'react'
import {Button} from '@material-ui/core'

export default function Phrase(props:PhraseProps) {
  const [bisectionIsActivated, setBisectionIsActivated] = useState(false)

  if (bisectionIsActivated) {
    return (
      <div className='PhraseYing'>
        <div>{props.words}</div>
        <Phrase words={props.words}/>
    </div>  
    )
  } else {
  return (
    <div className='PhraseYing'>
      <div>{props.words}</div>
      <Button 
        onClick={() => setBisectionIsActivated(true)}
      >divide!</Button>
    </div>
  )}
}

interface PhraseProps {
  words: string;
}