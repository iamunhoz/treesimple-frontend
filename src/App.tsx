import React from 'react'
import Sketch from "react-p5"
import {setup} from './setup'
import {draw} from './draw'

function App() {
  return (
    <Sketch
      setup={setup}
      draw={draw}
      className='p5Sketch'
    />
  )
}

export default App
