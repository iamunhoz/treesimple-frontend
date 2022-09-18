import { useAppStore } from 'state'

export default function SyntaxTree() {
  const sentence = useAppStore((state) => state.sentence)

  return <div className="border-4 text-blue-500">{sentence}</div>
}
