import { Phrase } from 'components/Phrase'
import { Line } from 'components/Phrase/components'
import { useTreeStore } from 'state'

export default function SyntaxTree() {
  const { phrases } = useTreeStore((state) => state)

  return (
    <div className='relative h-full w-full border-4 border-teal-200'>
      <div className='relative z-40 h-full w-full'>
        {phrases.map((phrase) => (
          <Phrase key={phrase.id} phrase={phrase} />
        ))}
      </div>
      <svg className='absolute top-0 left-0 z-20 h-full w-full'>
        {phrases.map((phrase) => (
          <Line phrase={phrase} key={phrase.id} />
        ))}
      </svg>
    </div>
  )
}
