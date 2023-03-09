import { nanoid } from 'nanoid'
import { useTreeStore } from 'state'
import { Id } from 'types/PhraseTypes'

type PhraseBodyProps = {
  body: string
  selfId: Id
}
export function PhraseBody(props: PhraseBodyProps): JSX.Element {
  const { body, selfId } = props
  const words = body.split(' ')

  const { addPhrase } = useTreeStore()

  // TODO criar ref para extrair anchors
  const splitHere = (idx: number) => {
    addPhrase([
      {
        body: words.slice(0, idx).join(' '),
        id: nanoid(),
        parentId: selfId,
        head: null,
        leftChildId: null,
        rightChildId: null,
        type: null
      },
      {
        body: words.slice(idx).join(' '),
        id: nanoid(),
        parentId: selfId,
        head: null,
        leftChildId: null,
        rightChildId: null,
        type: null
      }
    ])
  }

  return (
    <div className='flex'>
      {words.map((word, idx) => (
        <div key={word} className='flex'>
          {!!idx && (
            <button
              className='border border-transparent px-1 hover:border-2 hover:border-teal-200'
              onClick={() => {
                splitHere(idx)
              }}
            ></button>
          )}
          <span>{word}</span>
        </div>
      ))}
    </div>
  )
}
