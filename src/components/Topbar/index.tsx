import { useAppStore } from 'state'

export default function Topbar() {
  const setShowSentenceInput = useAppStore(
    (state) => state.setShowSentenceInput
  )

  const startOver = () => {
    setShowSentenceInput(true)
  }
  return (
    <div className="flex h-14 items-center justify-center bg-cyan-300">
      <p className="text-center text-xl">Noam</p>
      <button className="absolute right-0 mr-3" onClick={startOver}>
        Start Over
      </button>
    </div>
  )
}
