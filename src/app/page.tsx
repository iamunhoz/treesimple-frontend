"use client"

import { Box } from "@mui/material"
import { ExplanationSection, SentenceInputSection } from "./components"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/api"

export default function Home() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr",
        height: "100%",

        "& .SentenceInputSection, & .ExplanationSection": {
          border: "2px solid orange",
          height: "100%",
        },
      }}
    >
      <SentenceInputSection />
      <QueryClientProvider client={queryClient}>
        <ExplanationSection />
      </QueryClientProvider>
    </Box>
  )
}
