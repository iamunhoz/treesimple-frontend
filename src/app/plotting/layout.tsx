"use client"

import { Box } from "@mui/material"
import {
  BtnBackToSentenceInput,
  BtnSaveSentence,
  JotaiDevTools,
} from "../components"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/api"

export default function PlottingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
