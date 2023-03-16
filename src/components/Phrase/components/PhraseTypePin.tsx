import { TPhraseType } from 'types/PhraseTypes'

type PhraseTypePinProps = {
  type: TPhraseType | null
}
export function PhraseTypePin(props: PhraseTypePinProps): JSX.Element {
  const { type } = props

  if (!type) return <></>

  return (
    <div className='flex w-full flex-row justify-center'>
      <div className='w-4 rounded-xl border-2 border-lime-600 text-center text-xs leading-none text-lime-600'>
        {acronyms[type]}
      </div>
    </div>
  )
}

const acronyms: Record<string, string> = {
  Sentence: 'S'
}
