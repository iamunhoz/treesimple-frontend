"use client"

import { nanoid } from "nanoid"
import {
  Coordinates,
  LinesCoordinates,
  Phrase,
  PhraseType,
  PhraseTypeCode,
  PhraseTypeShortCode,
  Sentence,
  SentenceDTO,
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
  plainSentence: SentenceDTO
  sentence: Sentence
}) {
  plainSentence.phrases.forEach((phrase) => {
    if (phrase.parentId === plainSentence.id) {
      sentence.phrases.push({
        ...phrase,
        y: TOPMOST_PHRASE_Y,
        x: getXCenterPosition(phrase.body.length),
        phraseType: convertPhraseTypeCodeToPhraseType(phrase.phraseType),
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
  plainSentence: SentenceDTO
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
      phraseType: convertPhraseTypeCodeToPhraseType(leftPhrase.phraseType),
    })

    sentence.phrases.push({
      ...rightPhrase,
      ...getRightSideXYPosition(parentPhrase, leftPhrase.body.length),
      phraseType: convertPhraseTypeCodeToPhraseType(rightPhrase.phraseType),
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
      phraseId: phrase.id, // NOT SURE
      ...calculateParentXYLinePosition(parentPhrase),
      ...calculateThisPhraseXYLinePosition(phrase),
    })
  })

  return lines
}

export function convertSentenceDtoToTreeWithCoordinates(
  plainSentence: SentenceDTO
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

export function convertSentenceWithCoordinatesToSentenceDTO(
  sentence: Sentence
): SentenceDTO {
  return {
    id: sentence.id,
    phrases: sentence.phrases.map((phrase) => ({
      id: phrase.id,
      body: phrase.body,
      parentId: phrase.parentId,
      phraseType: phrase.phraseType?.code,
    })),
  }
}

export const PHRASE_TYPES_LIST: PhraseType[] = [
  {
    longName: "Sentence",
    code: PhraseTypeCode.Sentence,
    shortCode: PhraseTypeShortCode.Sentence,
  },
  {
    longName: "Noun Phrase",
    code: PhraseTypeCode.NounP,
    shortCode: PhraseTypeShortCode.NounP,
  },
  {
    longName: "Noun",
    code: PhraseTypeCode.Noun,
    shortCode: PhraseTypeShortCode.Noun,
  },
  {
    longName: "Verb Phrase",
    code: PhraseTypeCode.VerbP,
    shortCode: PhraseTypeShortCode.VerbP,
  },
  {
    longName: "Verb",
    code: PhraseTypeCode.Verb,
    shortCode: PhraseTypeShortCode.Verb,
  },
  {
    longName: "Adjective Phrase",
    code: PhraseTypeCode.AdjectiveP,
    shortCode: PhraseTypeShortCode.AdjectiveP,
  },
  {
    longName: "Adjective",
    code: PhraseTypeCode.Adjective,
    shortCode: PhraseTypeShortCode.Adjective,
  },
  {
    longName: "Preposition Phrase",
    code: PhraseTypeCode.PrepositionP,
    shortCode: PhraseTypeShortCode.PrepositionP,
  },
  {
    longName: "Preposition",
    code: PhraseTypeCode.Preposition,
    shortCode: PhraseTypeShortCode.Preposition,
  },
  {
    longName: "Determiner Phrase",
    code: PhraseTypeCode.DeterminerP,
    shortCode: PhraseTypeShortCode.DeterminerP,
  },
  {
    longName: "Determiner",
    code: PhraseTypeCode.Determiner,
    shortCode: PhraseTypeShortCode.Determiner,
  },
  {
    longName: "Adverb Phrase",
    code: PhraseTypeCode.AdverbP,
    shortCode: PhraseTypeShortCode.AdverbP,
  },
  {
    longName: "Adverb",
    code: PhraseTypeCode.Adverb,
    shortCode: PhraseTypeShortCode.Adverb,
  },
]

function convertPhraseTypeCodeToPhraseType(
  phraseTypeCode: PhraseTypeCode | undefined
): PhraseType | undefined {
  return PHRASE_TYPES_LIST.find(
    (phraseType) => phraseType.code === phraseTypeCode
  )
}

export function loopAndRemoveAllChildrenAndGrandChildren(
  phraseId: string,
  phrases: Phrase[],
  linesCoordinates: LinesCoordinates[]
) {
  const idsToRemove: string[] = []
  let phrasesWithoutRemovedChildPhrases: Phrase[] = []
  let linesWithoutRemovedChildLines: LinesCoordinates[] = []

  function loop(pId: string) {
    const foundChildrenWithThisParentId = phrases.filter(
      (phrase) => phrase.parentId === pId
    )

    if (!!foundChildrenWithThisParentId.length) {
      foundChildrenWithThisParentId.forEach((phrase) => {
        idsToRemove.push(phrase.id)
        loop(phrase.id)
      })
    } else {
      phrasesWithoutRemovedChildPhrases = phrases.filter(
        (phrase) => !idsToRemove.includes(phrase.id)
      )
      linesWithoutRemovedChildLines = linesCoordinates.filter(
        (line) => !idsToRemove.includes(line.phraseId)
      )
    }
  }

  loop(phraseId)

  return { phrasesWithoutRemovedChildPhrases, linesWithoutRemovedChildLines }
}
