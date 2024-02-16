export type PlainPhrase = {
  id: string
  body: string
  parentId: string
}

export type Coordinates = {
  x: number
  y: number
}

export type Phrase = PlainPhrase & Coordinates

export type PlainSentence = {
  id: string
  phrases: PlainPhrase[]
}

export type Sentence = {
  id: string
  phrases: Phrase[]
}

export interface LinesCoordinates {
  x: number
  y: number
  parentX: number
  parentY: number
}

export type PlainTree = {
  sentence: PlainSentence
}

export type TreeWithCoordinates = {
  sentence: Sentence
  lines: LinesCoordinates[]
}
