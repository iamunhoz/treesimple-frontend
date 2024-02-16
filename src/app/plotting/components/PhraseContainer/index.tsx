"use client"

import { Phrase } from "@/lib/definitions"
import {
  PHRASE_BODY_HEIGHT,
  calculateParentXYLinePosition,
  calculateThisPhraseXYLinePosition,
} from "@/lib/sentence"
import { getWidthFromCharLength } from "@/lib/strings"
import { getLeftSideXYPosition, getRightSideXYPosition } from "@/lib/sentence"
import { useSentenceActions } from "@/state/useSentenceActions"
import { Box } from "@mui/material"
import { nanoid } from "nanoid"
import { Fragment, useState } from "react"

type PhraseContainerProps = {
  phrase: Phrase
}
export function PhraseContainer(props: PhraseContainerProps): JSX.Element {
  const { phrase } = props
  const { addPhrasesToCurrentSentence, addLinesCoordinates } =
    useSentenceActions()
  const [isBtnSplitterDisabled, setIsBtnSplitterDisabled] = useState(false)

  const phraseWords = phrase.body.split(" ")
  const handleSplitPhraseHere = (idx: number) => {
    const leftSide: Phrase = {
      id: `leftside-${nanoid()}`, // TODO melhorar geração de id
      body: [...phraseWords].slice(0, idx).join(" "),
      ...getLeftSideXYPosition(phrase),
      parentId: phrase.id,
    }
    const rightSide: Phrase = {
      id: `rightside-${nanoid()}`,
      body: [...phraseWords].slice(idx).join(" "),
      ...getRightSideXYPosition(phrase, leftSide.body.length),
      parentId: phrase.id,
    }

    addPhrasesToCurrentSentence([leftSide, rightSide])
    addLinesCoordinates([
      {
        ...calculateParentXYLinePosition(phrase),
        ...calculateThisPhraseXYLinePosition(leftSide),
      },
      {
        ...calculateParentXYLinePosition(phrase),
        ...calculateThisPhraseXYLinePosition(rightSide),
      },
    ])
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
              disabled={isBtnSplitterDisabled}
            />
          )}
          <span>{word}</span>
        </Fragment>
      ))}
    </Box>
  )
}
