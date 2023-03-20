import { useAppStore } from 'state'
import { useTreeStore } from 'state'
import { TOP_BAR_HEIGHT } from 'utils/constants'

export default function Topbar() {
  const setShowSentenceInput = useAppStore(
    (state) => state.setShowSentenceInput
  )
  const { startOver } = useTreeStore((state) => state)

  const reset = () => {
    setShowSentenceInput(true)
    startOver()
  }
  return (
    <div
      className='flex items-center justify-center bg-cyan-300'
      style={{ height: TOP_BAR_HEIGHT }}
    >
      <p className='text-center text-xl'>Noam</p>
      <div className='absolute right-0 mr-3'>
        <button onClick={reset}>Start Over</button>
      </div>
    </div>
  )
}
