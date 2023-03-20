import { nanoid } from 'nanoid'
import { useTreeStore } from 'state'
import { Coord, TPhrase } from 'types/PhraseTypes'

type UsePhraseLogicProps = {
  ref: React.RefObject<HTMLDivElement> | undefined
  phrase: TPhrase
}
///////////////////////////////////////////////
// TODO criar ancoras para linhas de conexão //
//////////////////////////////////////////// //

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
    const { left, top, height } = ref.current.getBoundingClientRect()

    const leftChildId = `left-${nanoid()}`
    const rightChildId = `right-${nanoid()}`

    // gap é gerado considerando da segunda para a penultima palavra da frase
    let gap = (words.slice(1, -1).join(' ').length * 10) / 2
    // com um mínimo de 15px
    gap = gap < 15 ? 15 : gap

    const positionY = top + 10

    const bottomAnchor: Coord = {
      x: evt.clientX,
      y: top + height
    }

    addPhrase([
      {
        body: words.slice(0, idx).join(' '),
        parentId: id,
        id: leftChildId,
        // posição da frase da esquerda é determinado pela posição do mouse
        // menos o gap menos o tamanho da frase
        positionX: evt.clientX - gap - (evt.clientX - left),
        positionY
      },
      {
        body: words.slice(idx).join(' '),
        parentId: id,
        id: rightChildId,
        // posição da frase da direita é determinado pela posição do mouse mais o gap
        positionX: evt.clientX + gap,
        positionY
      }
    ])

    editPhrase(id, { leftChildId, rightChildId, bottomAnchor })
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

  const setTopAnchor = () => {
    if (!phrase.parentId || !ref || !ref.current || !!phrase.topAnchor) return
    const { left, top, width } = ref.current.getBoundingClientRect()

    const topAnchor: Coord = {
      x: Number((left + width / 2).toFixed(0)),
      y: Number(top.toFixed(0))
    }
    editPhrase(id, { topAnchor })
  }

  return { splitHere, setPosition, setTopAnchor }
}
