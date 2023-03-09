import { TPhraseType } from 'types/PhraseTypes'
import { ignore } from 'utils'

type PhraseContainerProps = {
  children: JSX.Element[]
  type: TPhraseType | null
  top: boolean
  bottom: boolean
}
export function PhraseContainer(props: PhraseContainerProps): JSX.Element {
  const { children, type, bottom, top } = props

  ignore(type, bottom, top)

  return <div>{children}</div>
}
