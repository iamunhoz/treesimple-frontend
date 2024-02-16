"use client"

import { Phrase } from "@/lib/definitions"
import { Y_INCREMENT } from "@/lib/sentence"
import { getWidthFromCharLength } from "@/lib/strings"
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
      id: `leftside-${nanoid()}`,
      body: [...phraseWords].slice(0, idx).join(" "),
      y: phrase.y + Y_INCREMENT,
      x: phrase.x - 10,
      parentId: phrase.id,
    }
    const rightSide: Phrase = {
      id: `rightside-${nanoid()}`,
      body: [...phraseWords].slice(idx).join(" "),
      y: phrase.y + Y_INCREMENT,
      // criar fusão desse '14' e o resultado de getWidthFromCharLength
      x: phrase.x + 16 * leftSide.body.length,
      parentId: phrase.id,
    }

    const bodyLength = getWidthFromCharLength(phrase.body)

    setIsBtnSplitterDisabled(true)
    addPhrasesToCurrentSentence([leftSide, rightSide])
    addLinesCoordinates([
      {
        parentX: phrase.x + bodyLength * 5,
        parentY: phrase.y + 30,
        x: leftSide.x + getWidthFromCharLength(leftSide.body) * 5,
        y: leftSide.y,
      },
      {
        parentX: phrase.x + bodyLength * 5,
        parentY: phrase.y + 30,
        x: rightSide.x + getWidthFromCharLength(rightSide.body) * 5,
        y: rightSide.y,
      },
    ])
  }
  return (
    <Box
      sx={{
        border: "2px solid orange",
        fontSize: "2rem",
        display: "flex",
        width: `${getWidthFromCharLength(phrase.body)}rem`,
        height: "30px",
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
