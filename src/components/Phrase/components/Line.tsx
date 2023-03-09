import { Id } from 'types/PhraseTypes'

type LineProps = {
  parentId: Id | null
  selfId: Id
}
export function Line(props: LineProps): JSX.Element {
  const { parentId, selfId } = props

  if (!parentId) return <></>
  return (
    <div>
      {parentId}
      {selfId}
    </div>
  )
}
