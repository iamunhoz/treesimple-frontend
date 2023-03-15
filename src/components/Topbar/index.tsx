import { useAppStore } from 'state'
import { useTreeStore } from 'state'

export default function Topbar() {
  const setShowSentenceInput = useAppStore(
    (state) => state.setShowSentenceInput
  )

  const startOver = () => {
    setShowSentenceInput(true)
  }
  return (
    <div className='flex h-14 items-center justify-center bg-cyan-300'>
      <p className='text-center text-xl'>Noam</p>
      <div className='absolute right-0 mr-3'>
        <button onClick={logState}>log state</button>
        <button onClick={startOver}>Start Over</button>
      </div>
    </div>
  )
}

const logState = () => {
  const treeStore = useTreeStore.getState()
  console.log('treeStore', treeStore)
}
