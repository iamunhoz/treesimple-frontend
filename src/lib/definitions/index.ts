export type Phrase = {
  id: string
  body: string
  parentId: string
}

export type Sentence = {
  id: string
  phrases: Phrase[]
}
