import { useTreeStore } from 'state'
import { TPhrase } from 'types/PhraseTypes'
import { TOP_BAR_HEIGHT } from 'utils/constants'

type LineProps = {
  phrase: TPhrase
}

const offset = TOP_BAR_HEIGHT + 5

export function Line(props: LineProps): JSX.Element {
  const { phrase } = props

  const { getPhrase } = useTreeStore()

  if (!phrase.parentId) return <></>

  const parentPhrase = getPhrase(phrase.parentId)

  if (!phrase.topAnchor || !parentPhrase || !parentPhrase.bottomAnchor)
    return <></>

  return (
    <line
      x1={phrase.topAnchor.x /* x - offset */}
      y1={phrase.topAnchor.y - offset}
      x2={parentPhrase.bottomAnchor.x /* x - offset */}
      y2={parentPhrase.bottomAnchor.y - offset}
      stroke='#99F6E4'
      strokeWidth='2'
    />
  )
}
