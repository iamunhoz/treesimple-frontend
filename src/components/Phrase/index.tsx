import { TPhrase } from 'types/PhraseTypes'
import { Line, PhraseTypePin, PhraseBody, PhraseContainer } from './components'

type PhraseProps = {
  phrase: TPhrase
}
export function Phrase(props: PhraseProps): JSX.Element {
  const { phrase } = props
  const { parentId, id, type, body, leftChildId, rightChildId } = phrase
  return (
    <>
      <PhraseContainer
        type={type}
        top={!!parentId}
        bottom={!!leftChildId || !!rightChildId}
      >
        <Line parentId={parentId} selfId={id} />
        <PhraseTypePin type={type} />
        <PhraseBody body={body} selfId={id} />
      </PhraseContainer>
    </>
  )
}
