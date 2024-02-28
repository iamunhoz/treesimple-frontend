"use client"

import { useSentenceActions } from "@/state/useSentenceActions"
import { Button } from "@mui/material"
import Link from "next/link"

export function BtnBackToSentenceInput(): JSX.Element {
  const { resetAppState } = useSentenceActions()

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
