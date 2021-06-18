import React from 'react'
import Phrase from './react/Phrase'

function App() {
  return (
    <Phrase 
      x={300}
      y={500}
      words={['hello', 'Darkness', 'my', 'old', 'friend']}
    />
  )
}

export default App
