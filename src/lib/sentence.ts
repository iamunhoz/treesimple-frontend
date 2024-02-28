"use client"

import { nanoid } from "nanoid"
import {
  Coordinates,
  Phrase,
  PhraseType,
  PlainSentence,
  Sentence,
  TreeWithCoordinates,
} from "./definitions"
import { getWidthFromCharLength } from "./strings"

export const TOPMOST_PHRASE_Y = 75
export const Y_INCREMENT = 75
export const PHRASE_BODY_HEIGHT = 30

export function calculateParentXYLinePosition(parentPhrase: Phrase) {
  const bodyLength = getWidthFromCharLength(parentPhrase.body)

  return {
    parentX: parentPhrase.x + bodyLength * 5,
    parentY: parentPhrase.y + PHRASE_BODY_HEIGHT,
  }
}

export function calculateThisPhraseXYLinePosition(phrase: Phrase) {
  const bodyLength = getWidthFromCharLength(phrase.body)
  return { x: phrase.x + bodyLength * 5, y: phrase.y }
}

export function getXCenterPosition(bodyLength: number) {
  return window.innerWidth / 2 - bodyLength * 7
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

export function createLeftSideSplit(
  phrase: Phrase,
  splitterIdx: number
): Phrase {
  const phraseWords = phrase.body.split(" ")
  return {
    id: `leftside-${nanoid()}`, // TODO melhorar geração de id
    body: [...phraseWords].slice(0, splitterIdx).join(" "),
    ...getLeftSideXYPosition(phrase),
    parentId: phrase.id,
  }
}

export function createRigthSideSplit(
  phrase: Phrase,
  splitterIdx: number,
  leftSideBodyLength: number
) {
  const phraseWords = phrase.body.split(" ")
  return {
    id: `rightside-${nanoid()}`,
    body: [...phraseWords].slice(splitterIdx).join(" "),
    ...getRightSideXYPosition(phrase, leftSideBodyLength),
    parentId: phrase.id,
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

function setChildrenCoordinates({
  parentId,
  plainSentence,
  sentence,
}: {
  parentId: string
  plainSentence: PlainSentence
  sentence: Sentence
}) {
  const parentPhrase = sentence.phrases.filter(
    (phrase) => phrase.id === parentId
  )[0]

  // find child phrases, but without distinguishing sides
  const foundChildren = plainSentence.phrases.filter(
    (phrase) => phrase.parentId === parentId
  )

  if (foundChildren.length) {
    // ensure right order: 0 is leftside, 1 is rightside
    // because rightside position is calculated AFTER leftside position is known
    const [leftPhrase, rightPhrase] = foundChildren.sort((phrase) =>
      phrase.id.includes("leftside") ? 1 : 0
    )

    sentence.phrases.push({
      ...leftPhrase,
      ...getLeftSideXYPosition(parentPhrase),
    })

    sentence.phrases.push({
      ...rightPhrase,
      ...getRightSideXYPosition(parentPhrase, leftPhrase.body.length),
    })

    // repeat recursively...
    setChildrenCoordinates({ parentId: leftPhrase.id, plainSentence, sentence })
    setChildrenCoordinates({
      parentId: rightPhrase.id,
      plainSentence,
      sentence,
    })
  } else {
    // until no children is found
    return
  }
}

function generateLinesFromPositionedPhrases(
  phrases: Phrase[]
): TreeWithCoordinates["lines"] {
  const lines: TreeWithCoordinates["lines"] = []

  // slice bc phrases[0] doesn't have parent to draw lines to
  phrases.slice(1).forEach((phrase) => {
    const parentPhrase = phrases.find(
      (__phrase) => phrase.parentId === __phrase.id
    )
    if (!parentPhrase) return

    lines.push({
      ...calculateParentXYLinePosition(parentPhrase),
      ...calculateThisPhraseXYLinePosition(phrase),
    })
  })

  return lines
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
    parentId: sentence.phrases[0].id,
    plainSentence,
    sentence,
  })

  const lines = generateLinesFromPositionedPhrases(sentence.phrases)

  return {
    sentence,
    lines,
  }
}

export function convertSentenceWithCoordinatesToPlainSentence(
  sentence: Sentence
): PlainSentence {
  return {
    id: sentence.id,
    phrases: sentence.phrases.map((phrase) => ({
      id: phrase.id,
      body: phrase.body,
      parentId: phrase.parentId,
      type: phrase.type,
    })),
  }
}

export const PHRASE_TYPES_LIST: PhraseType[] = [
  {
    longName: "Verb Phrase",
    shortName: "VP",
  },
  {
    longName: "Noun Phrase",
    shortName: "NP",
  },
]
