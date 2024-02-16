"use client"

import {
  PlainPhrase,
  PlainSentence,
  Sentence,
  TreeWithCoordinates,
} from "./definitions"

export function getXCenterPosition(bodyLength: number) {
  return window.innerWidth / 2 - bodyLength * 6
}

export const TOPMOST_PHRASE_Y = 25
export const Y_INCREMENT = 75

function setTopmostPhraseCoordinates({
  plainSentence,
  sentence,
}: {
  plainSentence: PlainSentence
  sentence: Sentence
}) {
  plainSentence.phrases.forEach((phrase) => {
    if (phrase.parentId === sentence.id) {
      sentence.phrases.push({
        ...phrase,
        y: TOPMOST_PHRASE_Y,
        x: getXCenterPosition(phrase.body.length),
      })
    }
  })
}

// function calculateX

function setChildrenCoordinates({
  id,
  plainSentence,
  sentence,
}: {
  id: string
  plainSentence: PlainSentence
  sentence: Sentence
}) {
  const foundChildren = plainSentence.phrases.filter(
    (phrase) => phrase.parentId === id
  )

  if (foundChildren.length) {
    const [leftPhrase, rightPhrase] = foundChildren.sort((phrase) =>
      phrase.id.includes("leftside") ? 1 : 0
    )

    console.log("setChildrenCoordinates", { leftPhrase, rightPhrase })
    return
    // if no children is found, this is the bottommost phrase
  } else {
    return
  }
}

export function convertPlainTreeToTreeWithCoordinates(
  plainSentence: PlainSentence
): TreeWithCoordinates {
  const sentence: Sentence = {
    id: plainSentence.id,
    phrases: [],
  }

  setTopmostPhraseCoordinates({ plainSentence, sentence })
  setChildrenCoordinates({
    id: sentence.phrases[0].id,
    plainSentence,
    sentence,
  })

  // console.log({ sentence })

  return {
    sentence,
    lines: [],
  }
}
