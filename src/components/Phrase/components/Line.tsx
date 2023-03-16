type LineProps = {
  parentId?: string | null
  selfId: string
}
export function Line(props: LineProps): JSX.Element {
  const { parentId, selfId } = props

  if (!parentId) return <></>
  return (
    <div className='text-xs text-red-500' hidden>
      {parentId}
      {selfId}
    </div>
  )
}
