import { useRef } from 'react'
import { TPhrase } from 'types/PhraseTypes'
import { Line, PhraseTypePin, PhraseBody } from './components'
import usePhraseLogic from './components/usePhraseLogic'

type PhraseProps = {
  phrase: TPhrase
}

export function Phrase(props: PhraseProps): JSX.Element {
  const { phrase } = props
  const { parentId, id, type, body } = phrase
  const words = body.split(' ')

  const ref = useRef<HTMLDivElement>(null)

  const { splitHere, setPosition } = usePhraseLogic({ phrase, ref })

  return (
    <div
      ref={ref}
      className={`absolute w-fit ${!parentId ? '-translate-x-1/2' : ''}`}
      style={setPosition()}
    >
      <Line parentId={parentId} selfId={id} />
      <PhraseTypePin type={type} />
      <PhraseBody words={words} splitHere={splitHere} />
    </div>
  )
}
