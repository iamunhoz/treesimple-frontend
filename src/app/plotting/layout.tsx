"use client"

import { useSentenceActions } from "@/state/useSentenceActions"
import { Box, Button } from "@mui/material"
import Link from "next/link"
import { DevTools } from "jotai-devtools"

export default function PlottingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { resetAppState } = useSentenceActions()

  const handleSalvar = () => {
    // aguardando endpoint Sentence ser criado
  }

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
        <Button
          LinkComponent={Link}
          href="/"
          onClick={resetAppState}
          sx={{
            color: "white",
            fontSize: "1rem",
            width: "1.5rem",
            height: "2.4rem",
            p: 0,
          }}
        >
          Voltar
        </Button>
        <Button variant="contained" onClick={handleSalvar}>
          Salvar
        </Button>
      </Box>
      <DevTools theme="dark" />
    </Box>
  )
}
