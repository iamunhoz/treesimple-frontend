"use client"

import { Box } from "@mui/material"
import { BtnBackToSentenceInput, BtnSaveSentence } from "../components"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAppStore } from "@/state"

export default function PlottingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const currentSentence = useAppStore(({ currentSentence }) => currentSentence)

  useEffect(() => {
    if (
      !currentSentence ||
      !currentSentence.id.length ||
      !currentSentence.phrases.length
    ) {
      router.push("/")
    }
  }, [currentSentence, router])

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      <>{children}</>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <BtnBackToSentenceInput />
        <QueryClientProvider client={queryClient}>
          <BtnSaveSentence />
        </QueryClientProvider>
      </Box>
    </Box>
  )
}
