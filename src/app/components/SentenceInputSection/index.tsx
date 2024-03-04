"use client"

import { getXCenterPosition } from "@/lib/sentence"
import { useAppStore } from "@/state"
import { Box, Button, Input } from "@mui/material"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"
import { ChangeEventHandler, useState } from "react"

export function SentenceInputSection(): JSX.Element {
  const replaceCurrentSentence = useAppStore(
    ({ replaceCurrentSentence }) => replaceCurrentSentence
  )
  const [rawSentence, setRawSentence] = useState("The yellow rabbit is here")
  const router = useRouter()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setRawSentence(evt.target.value)
  }

  const handleStartButtonClick = () => {
    const thisId = nanoid()
    const sentence = getSentenceData(rawSentence, thisId)
    replaceCurrentSentence({
      id: thisId,
      phrases: [sentence],
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

function getSentenceData(body: string, parentId: string) {
  const phrase = {
    id: nanoid(),
    body,
    parentId,
    x: 0,
    y: 75,
  }

  phrase.x = getXCenterPosition(body.length)
  return phrase
}
