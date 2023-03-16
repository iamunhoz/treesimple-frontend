import { Phrase } from 'components/Phrase'
import { useTreeStore } from 'state'

export default function SyntaxTree() {
  const { phrases } = useTreeStore((state) => state)

  return (
    <div className='relative h-full w-full border-4 border-teal-200'>
      {phrases.map((phrase) => (
        <Phrase key={phrase.id} phrase={phrase} />
      ))}
    </div>
  )
}
