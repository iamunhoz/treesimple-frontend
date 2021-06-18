import React from 'react'
import Sketch from "react-p5"
import {setup} from './../p5/setup'
import {draw} from './../p5/draw'

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
