"use client"

import { useSentenceActions } from "@/state/useSentenceActions"
import { Box, Button, Input } from "@mui/material"
import { useRouter } from "next/navigation"
import { ChangeEventHandler, useState } from "react"

export function SentenceInputSection(): JSX.Element {
  const { replaceCurrentSentence } = useSentenceActions()
  const [rawSentence, setRawSentence] = useState(
    "The bastard yellow rabbit is here"
  )
  const router = useRouter()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setRawSentence(evt.target.value)
  }

  const handleStartButtonClick = () => {
    replaceCurrentSentence({
      id: "xxx",
      phrases: [{ id: "1", body: rawSentence, parentId: "xxx" }],
    })
    router.push("/plotting")
  }

  return (
    <Box
      className="SentenceInputSection"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        "& > *": {
          color: "white",
        },
      }}
    >
      <Input
        value={rawSentence}
        onChange={handleChange}
        sx={{
          border: "2px solid orange",
          width: "90%",
          color: "white",

          "& *": {
            textAlign: "center",
          },
        }}
      />
      <Button onClick={handleStartButtonClick}>Start</Button>
    </Box>
  )
}
