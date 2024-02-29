"use client"

import { Box } from "@mui/material"
import {
  BtnBackToSentenceInput,
  BtnSaveSentence,
  JotaiDevTools,
} from "../components"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useAtomValue } from "jotai"
import { currentSentenceAtom } from "@/state/atoms"
import { useEffect } from "react"

export default function PlottingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const currentSentence = useAtomValue(currentSentenceAtom)

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
      <JotaiDevTools />
    </Box>
  )
}
