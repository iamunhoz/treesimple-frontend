"use client"

import { Phrase } from "@/lib/definitions"
import { currentSentenceAtom } from "../../state/atoms"
import { Box } from "@mui/material"
import { useAtomValue } from "jotai"
import { getWidthFromCharLength } from "@/lib/strings"
import { Fragment } from "react"
import { nanoid } from "nanoid"
import { useSentenceActions } from "@/state/useSentenceActions"

export default function Plotting() {
  const currentSentence = useAtomValue(currentSentenceAtom)
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
    </Box>
  )
}

type PhraseContainerProps = {
  phrase: Phrase
}
export function PhraseContainer(props: PhraseContainerProps): JSX.Element {
  const { phrase } = props
  const { addPhrasesToCurrentSentence } = useSentenceActions()

  const phraseWords = phrase.body.split(" ")
  const handleSplitPhraseHere = (idx: number) => {
    const leftSide: Phrase = {
      id: nanoid(),
      body: [...phraseWords].slice(0, idx).join(" "),
      y: phrase.y + 75,
      x: phrase.x - 10,
      parentId: phrase.id,
    }
    const rightSide: Phrase = {
      id: nanoid(),
      body: [...phraseWords].slice(idx).join(" "),
      y: phrase.y + 75,
      x: phrase.x + 12 * leftSide.body.length,
      parentId: phrase.id,
    }

    addPhrasesToCurrentSentence([leftSide, rightSide])
  }
  return (
    <Box
      sx={{
        border: "2px solid orange",
        fontSize: "2rem",
        display: "flex",
        width: getWidthFromCharLength(phrase.body),
        justifyContent: "center",
        alignItems: "end",
        position: "absolute",
        top: phrase.y,
        left: phrase.x,
        p: 0,
      }}
    >
      {phraseWords.map((word, idx) => (
        <Fragment key={idx}>
          {idx > 0 && (
            <Box
              component="button"
              sx={{
                border: "1px solid brown",
                width: "1rem",
                height: "2.5rem",
                p: 0,
                m: 0,
              }}
              onClick={() => handleSplitPhraseHere(idx)}
            />
          )}
          <span>{word}</span>
        </Fragment>
      ))}
    </Box>
  )
}
