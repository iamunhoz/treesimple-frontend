"use client"

import { useAppStore } from "@/state"
import { Button } from "@mui/material"
import Link from "next/link"

export function BtnBackToSentenceInput(): JSX.Element {
  const resetAppState = useAppStore(({ resetAppState }) => resetAppState)

  return (
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
  )
}
