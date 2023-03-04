import { useAppStore } from 'state'
import InputSentence from './InputSentence'
import SyntaxTree from './SyntaxTree'
import Topbar from './Topbar'

function App() {
  const showSentenceInput = useAppStore((state) => state.showSentenceInput)

  return (
    <div className='flex h-full flex-col bg-yellow-100'>
      <Topbar />

      <div className='flex flex-1 flex-col items-center justify-center'>
        {showSentenceInput ? <InputSentence /> : <SyntaxTree />}
      </div>
    </div>
  )
}

export default App
