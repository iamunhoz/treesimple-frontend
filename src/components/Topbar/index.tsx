import { buildUrl } from 'services/axios/ip'
import { SemToken } from 'services/crud'
import { useAppStore } from 'state'
import { useTreeStore } from 'state'
import { TOP_BAR_HEIGHT } from 'utils/constants'

const testServer = async () => {
  const params = {
    key: 'teste-front',
    value: 'sucesso'
  }
  const url = buildUrl('add-new-value', params)
  const response = await SemToken.get(url)

  console.log('railway server response', response)
}

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
        <button onClick={testServer}>test server</button>
        <button onClick={reset}>Start Over</button>
      </div>
    </div>
  )
}
