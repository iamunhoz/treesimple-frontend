"use client"

import { currentSentenceAtom } from "@/state/atoms"
import { Box, Button } from "@mui/material"
import { useAtomValue } from "jotai"
import Link from "next/link"

export default function PlottingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const currentSentence = useAtomValue(currentSentenceAtom)
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
          bottom: 0,
          right: 0,
          fontSize: "1.5rem",
          color: "white",
        }}
      >
        {JSON.stringify(currentSentence)}
      </Box>
      <Button
        LinkComponent={Link}
        href="/"
        sx={{ position: "absolute", top: 0, right: 0 }}
      >
        Voltar
      </Button>
    </Box>
  )
}
