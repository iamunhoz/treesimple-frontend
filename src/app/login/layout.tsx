"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/api"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
