import { useCallback, useState } from 'react'
import { useAppStore } from 'state'

export default function InputSentence() {
  const [inputValue, setinputValue] = useState('')
  const setShowSentenceInput = useAppStore(
    (state) => state.setShowSentenceInput
  )

  const { setSentence } = useAppStore((state) => state)

  const startBuilding = useCallback(() => {
    setSentence(inputValue)
    setShowSentenceInput(false)
  }, [inputValue, setSentence, setShowSentenceInput])

  return (
    <div className='flex flex-col items-center'>
      <input
        type={'text'}
        className='w-96 rounded border-2 focus:outline focus:outline-4 focus:outline-blue-500'
        value={inputValue}
        onChange={(evt) => {
          setinputValue(evt.currentTarget.value)
        }}
      />
      <button
        className='mt-3 w-36 rounded bg-blue-500 p-1 text-white'
        onClick={startBuilding}
      >
        start building
      </button>
    </div>
  )
}
