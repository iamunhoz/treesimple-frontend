"use client"

import { Phrase } from "@/lib/definitions"
import { PHRASE_BODY_HEIGHT } from "@/lib/sentence"
import { getWidthFromCharLength } from "@/lib/strings"
import { useSentenceActions } from "@/state/useSentenceActions"
import { Box } from "@mui/material"
import { Fragment, useState } from "react"
import { PhrasePin } from ".."

type PhraseContainerProps = {
  phrase: Phrase
}
export function PhraseContainer(props: PhraseContainerProps): JSX.Element {
  const { phrase } = props
  const { sendSplitToState } = useSentenceActions()
  const [isBtnSplitterDisabled, setIsBtnSplitterDisabled] = useState(false)

  const handleSplitPhraseHere = (idx: number) => {
    sendSplitToState(phrase, idx)
    setIsBtnSplitterDisabled(true)
  }
  return (
    <Box
      sx={{
        border: "2px solid orange",
        fontSize: "2rem",
        display: "flex",
        width: `${getWidthFromCharLength(phrase.body)}rem`,
        height: `${PHRASE_BODY_HEIGHT}px`,
        justifyContent: "center",
        alignItems: "end",
        position: "absolute",
        zIndex: 200,
        top: phrase.y,
        left: phrase.x,
        p: 0,
      }}
      id={phrase.id}
    >
      <PhrasePin />
      {phrase.body.split(" ").map((word, idx) => (
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
              disabled={isBtnSplitterDisabled}
            />
          )}
          <span>{word}</span>
        </Fragment>
      ))}
    </Box>
  )
}
