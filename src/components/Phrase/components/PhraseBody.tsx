/** missão:
 * 1. posicionar usando absolute e coordenadas
 * 2. conectar anchors de parents and children
 * 3. desenhar linhas
 * */

type PhraseBodyProps = {
  words: string[]
  splitHere: (
    idx: number,
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}

export function PhraseBody(props: PhraseBodyProps): JSX.Element {
  const { words, splitHere } = props

  return (
    <div className='flex rounded-md border-4 border-teal-200 px-1'>
      {words.map((word, idx) => (
        <div key={word} className='flex'>
          {!!idx && (
            <button
              className='border border-transparent px-1 hover:border-2 hover:border-teal-200'
              onClick={(evt) => {
                splitHere(idx, evt)
              }}
            ></button>
          )}
          <span>{word}</span>
        </div>
      ))}
    </div>
  )
}
