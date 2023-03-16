import { nanoid } from 'nanoid'
import { useTreeStore } from 'state'
import { TPhrase } from 'types/PhraseTypes'

const GAP = 50

type UsePhraseLogicProps = {
  ref: React.RefObject<HTMLDivElement>
  phrase: TPhrase
}

export default function usePhraseLogic(props: UsePhraseLogicProps) {
  const { ref, phrase } = props
  const { id, body } = phrase
  const words = body.split(' ')
  const { addPhrase, editPhrase } = useTreeStore()

  const splitHere = (
    idx: number,
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!ref || !ref.current) return
    const { left, width, top } = ref.current.getBoundingClientRect()

    const leftChild: Partial<TPhrase> = {
      id: `left-${nanoid()}`,
      width: evt.clientX - left
    }
    const rightChild: Partial<TPhrase> = {
      id: `right-${nanoid()}`,
      width: width - evt.clientX
    }

    leftChild.positionX = left - GAP
    rightChild.positionX = left + (leftChild.width as number) + GAP

    const positionY = top + 100

    addPhrase([
      {
        body: words.slice(0, idx).join(' '),
        parentId: id,
        id: leftChild.id as string,
        positionX: leftChild.positionX,
        positionY
      },
      {
        body: words.slice(idx).join(' '),
        parentId: id,
        id: rightChild.id as string,
        positionX: rightChild.positionX,
        positionY
      }
    ])

    editPhrase(id, { leftChildId: leftChild.id, rightChildId: rightChild.id })
  }

  const setPosition = (): React.CSSProperties => {
    if (!phrase.parentId || !phrase.positionX || !phrase.positionY) {
      return {
        left: '50%',
        top: '1rem'
      }
    }

    return { top: phrase.positionY, left: phrase.positionX }
  }

  return { splitHere, setPosition }
}
