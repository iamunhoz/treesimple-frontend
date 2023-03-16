/** missão:
 * 1. posicionar usando absolute e coordenadas
 * 2. conectar anchors de parents and children
 * 3. desenhar linhas
 * */

import { useState } from 'react'

type PhraseBodyProps = {
  words: string[]
  splitHere: (
    idx: number,
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}

export function PhraseBody(props: PhraseBodyProps): JSX.Element {
  const { words, splitHere } = props
  const [disabled, setDisabled] = useState(false)

  return (
    <div className='flex rounded-md border-4 border-teal-200 px-1'>
      {words.map((word, idx) => (
        <div key={word} className='flex'>
          {!!idx && (
            <button
              className='border-2 border-transparent px-1 hover:border-2 hover:border-teal-200 disabled:border-none disabled:hover:border-none'
              onClick={(evt) => {
                setDisabled(true)
                splitHere(idx, evt)
              }}
              disabled={disabled}
            ></button>
          )}
          <span>{word}</span>
        </div>
      ))}
    </div>
  )
}
