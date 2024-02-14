export type Phrase = {
  id: string
  body: string
  parentId: string
  x: number
  y: number
}

export type Sentence = {
  id: string
  phrases: Phrase[]
}
