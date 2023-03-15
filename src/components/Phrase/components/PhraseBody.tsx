import { nanoid } from 'nanoid'
import { useRef } from 'react'
import { useTreeStore } from 'state'
import { Coord, Id } from 'types/PhraseTypes'

/** missão:
 * 1. posicionar usando absolute e coordenadas
 * 2. conectar anchors de parents and children
 * 3. desenhar linhas
 * */

type PhraseBodyProps = {
  body: string
  selfId: Id
}

const getAnchors = (
  ref: React.RefObject<HTMLDivElement>
): Coord | undefined => {
  if (!ref || !ref.current) return undefined

  const { left, top, width, height } = ref.current.getBoundingClientRect()
}

export function PhraseBody(props: PhraseBodyProps): JSX.Element {
  const { body, selfId } = props
  const words = body.split(' ')

  const ref = useRef<HTMLDivElement>(null)

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
        type: null,
        anchor: {
          top: getAnchors(ref)
        }
      },
      {
        body: words.slice(idx).join(' '),
        id: nanoid(),
        parentId: selfId,
        head: null,
        leftChildId: null,
        rightChildId: null,
        type: null,
        anchor: {
          top: getAnchors(ref)
        }
      }
    ])
  }

  return (
    <div className='flex border-4' ref={ref}>
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
