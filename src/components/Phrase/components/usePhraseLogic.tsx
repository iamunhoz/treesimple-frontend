import { nanoid } from 'nanoid'
import { useTreeStore } from 'state'
import { TPhrase } from 'types/PhraseTypes'

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
    const { left, top } = ref.current.getBoundingClientRect()

    const leftChildId = `left-${nanoid()}`
    const rightChildId = `right-${nanoid()}`

    let gap = (words.slice(1, -1).join(' ').length * 10) / 2
    gap = gap < 15 ? 15 : gap

    const positionY = top + 10

    addPhrase([
      {
        body: words.slice(0, idx).join(' '),
        parentId: id,
        id: leftChildId,
        positionX: evt.clientX - gap - (evt.clientX - left),
        positionY
      },
      {
        body: words.slice(idx).join(' '),
        parentId: id,
        id: rightChildId,
        positionX: evt.clientX + gap,
        positionY
      }
    ])

    editPhrase(id, { leftChildId, rightChildId })
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
