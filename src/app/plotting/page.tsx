"use client"

import { currentSentenceAtom, drawingLinesCoordinatesAtom } from "@/state/atoms"
import { Box } from "@mui/material"
import { useAtomValue } from "jotai"
import { PhraseContainer } from "./components"

export default function Plotting() {
  const currentSentence = useAtomValue(currentSentenceAtom)
  const drawingLinesCoordinates = useAtomValue(drawingLinesCoordinatesAtom)
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      {currentSentence.phrases.map((phrase) => (
        <PhraseContainer phrase={phrase} key={phrase.id} />
      ))}
      <Box
        component="svg"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(50,0,0,0.3)",
        }}
      >
        {drawingLinesCoordinates.map((line) => (
          <line
            key={JSON.stringify(line)}
            x1={line.x}
            y1={line.y}
            x2={line.parentX}
            y2={line.parentY}
            stroke="orange"
            color="orange"
          />
        ))}
      </Box>
    </Box>
  )
}