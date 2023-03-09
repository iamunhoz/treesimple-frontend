import { TPhraseType } from 'types/PhraseTypes'

type PhraseTypePinProps = {
  type: TPhraseType | null
}
export function PhraseTypePin(props: PhraseTypePinProps): JSX.Element {
  const { type } = props
  return <div>{type}</div>
}
