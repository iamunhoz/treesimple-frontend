import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tree')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tree"!</div>
}
