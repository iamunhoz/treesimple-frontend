import { useTreeStore } from 'state'
import { TPhrase } from 'types/PhraseTypes'

type LineProps = {
  phrase: TPhrase
}
export function Line(props: LineProps): JSX.Element {
  const { phrase } = props

  const { getPhrase } = useTreeStore()

  if (!phrase.parentId) return <></>

  const parentPhrase = getPhrase(phrase.parentId)

  return (
    <line
      x1={phrase.topAnchor?.x}
      y1={phrase.topAnchor?.y}
      x2={parentPhrase?.bottomAnchor?.x}
      y2={parentPhrase?.bottomAnchor?.y}
      stroke='#99F6E4'
      strokeWidth='2'
    />
  )
}
