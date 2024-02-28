"use client"

import { convertPlainTreeToTreeWithCoordinates } from "@/lib/sentence"
import { plainSentence } from "@/state/sentence-examples"
import { useSentenceActions } from "@/state/useSentenceActions"
import { Box, Button, Input } from "@mui/material"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"
import { ChangeEventHandler, useState } from "react"

export function SentenceInputSection(): JSX.Element {
  const { replaceCurrentSentence, addLinesCoordinates } = useSentenceActions()
  const [rawSentence, setRawSentence] = useState(
    "The bastard yellow rabbit is here"
  )
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

  const handleSentenceImport = () => {
    const tree = convertPlainTreeToTreeWithCoordinates(plainSentence)
    replaceCurrentSentence(tree.sentence)
    addLinesCoordinates(tree.lines)
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

      <Button onClick={handleSentenceImport}>Test sentence import</Button>
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

  phrase.x = window.innerWidth / 2 - phrase.body.length * 7 // talvez esse 7 precise de normalização

  return phrase
}
