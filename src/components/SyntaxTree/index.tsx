import { Phrase } from 'components/Phrase'
import { useTreeStore } from 'state'

export default function SyntaxTree() {
  const { phrases } = useTreeStore((state) => state)

  return (
    <div>
      {phrases.map((phrase) => (
        <Phrase key={phrase.id} phrase={phrase} />
      ))}
    </div>
  )
}
