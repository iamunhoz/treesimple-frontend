"use client"

import {
  Coordinates,
  Phrase,
  PlainPhrase,
  PlainSentence,
  Sentence,
  TreeWithCoordinates,
} from "./definitions"

export const TOPMOST_PHRASE_Y = 25
export const Y_INCREMENT = 75

export function getXCenterPosition(bodyLength: number) {
  return window.innerWidth / 2 - bodyLength * 6
}

export const getLeftSideXYPosition = (phrase: Phrase): Coordinates => {
  return {
    x: phrase.x - 10,
    y: phrase.y + Y_INCREMENT,
  }
}

export const getRightSideXYPosition = (
  phrase: Phrase,
  leftSideBodyLength: number
): Coordinates => {
  return {
    x: phrase.x + 16 * leftSideBodyLength,
    y: phrase.y + Y_INCREMENT,
  }
}

function setTopmostPhraseCoordinates({
  plainSentence,
  sentence,
}: {
  plainSentence: PlainSentence
  sentence: Sentence
}) {
  plainSentence.phrases.forEach((phrase) => {
    if (phrase.parentId === plainSentence.id) {
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
  // find this phrase in sentence obj
  const thisPhrase = sentence.phrases.filter((phrase) => phrase.id === id)[0]

  // find child phrases, but without distinguishing sides
  const foundChildren = plainSentence.phrases.filter(
    (phrase) => phrase.parentId === id
  )

  if (foundChildren.length) {
    // ensure right order: 0 is leftside, 1 is rightside
    const [leftPhrase, rightPhrase] = foundChildren.sort((phrase) =>
      phrase.id.includes("leftside") ? 1 : 0
    )

    sentence.phrases.push({
      ...leftPhrase,
      ...getLeftSideXYPosition(thisPhrase),
    })

    sentence.phrases.push({
      ...rightPhrase,
      ...getRightSideXYPosition(thisPhrase, leftPhrase.body.length),
    })

    setChildrenCoordinates({ id: leftPhrase.id, plainSentence, sentence })
    setChildrenCoordinates({ id: rightPhrase.id, plainSentence, sentence })
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
