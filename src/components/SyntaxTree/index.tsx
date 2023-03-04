import { SyntaxStore, useAppStore, useSyntaxStore } from 'state'
import shallow from 'zustand/shallow'

export default function SyntaxTree() {
  const sentence = useAppStore((state) => state.sentence)
  const phrases = useSyntaxStore((state) => (state as SyntaxStore).phrases)

  const { addPhrase, getPhrase, removePhrase } = useSyntaxStore(
    (state) => ({
      addPhrase: (state as SyntaxStore).addPhrase,
      getPhrase: (state as SyntaxStore).getPhrase,
      removePhrase: (state as SyntaxStore).removePhrase
    }),
    shallow
  )

  console.log(addPhrase, getPhrase, removePhrase)

  return (
    <div className='border-4'>
      <h1>{sentence}</h1>

      {phrases.map((phrase) => (
        <p key={phrase.getSelfId()}>{phrase.getPhrase()}</p>
      ))}
    </div>
  )
}
