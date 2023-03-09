import { nanoid } from 'nanoid'
import React, { useCallback, useState } from 'react'
import { useAppStore, useTreeStore } from 'state'

export default function InputSentence() {
  const [inputValue, setinputValue] = useState('')
  const setShowSentenceInput = useAppStore(
    (state) => state.setShowSentenceInput
  )

  const { setCurrentTree } = useAppStore((state) => state)
  const { addPhrase } = useTreeStore((state) => state)

  const startBuilding = useCallback(() => {
    setCurrentTree(inputValue)
    addPhrase([
      {
        body: inputValue,
        id: nanoid(),
        leftChildId: null,
        rightChildId: null,
        head: null,
        type: 'Sentence',
        parentId: null
      }
    ])
    setShowSentenceInput(false)
  }, [addPhrase, inputValue, setCurrentTree, setShowSentenceInput])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        startBuilding()
      }
    },
    [startBuilding]
  )

  return (
    <div className='flex w-full flex-col items-center px-24'>
      <input
        type={'text'}
        className='w-full rounded border-2 text-center text-3xl focus:outline focus:outline-4 focus:outline-blue-500'
        value={inputValue}
        onChange={(evt) => {
          setinputValue(evt.currentTarget.value)
        }}
        onKeyDown={handleKeyDown}
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
