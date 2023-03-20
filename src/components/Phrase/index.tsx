import { useEffect, useRef, useState } from 'react'
import { TPhrase } from 'types/PhraseTypes'
import { PhraseTypePin, PhraseBody } from './components'
import usePhraseLogic from './components/usePhraseLogic'

type PhraseProps = {
  phrase: TPhrase
}

export function Phrase(props: PhraseProps): JSX.Element {
  const { phrase } = props
  const { parentId, type, body } = phrase
  const words = body.split(' ')

  const ref = useRef<HTMLDivElement>(null)
  const [firstRun, setFirstRun] = useState(true)

  const { splitHere, setPosition, setTopAnchor } = usePhraseLogic({
    phrase,
    ref
  })

  useEffect(() => {
    if (!ref || !ref.current || !firstRun) return
    setTopAnchor()
    setFirstRun(false)
  }, [firstRun, setTopAnchor])
  return (
    <div
      ref={ref}
      className={`absolute w-fit ${!parentId ? '-translate-x-1/2' : ''}`}
      style={setPosition()}
    >
      <PhraseTypePin type={type} />
      <PhraseBody words={words} splitHere={splitHere} />
    </div>
  )
}
