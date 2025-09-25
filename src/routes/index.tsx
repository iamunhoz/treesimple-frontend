import { Phrase } from '@/components/Phrase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div >
      <Phrase />
    </div>
  )
}
