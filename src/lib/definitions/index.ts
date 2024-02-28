import { ResponseStatus } from "../api"

export type PhraseType = {
  longName: string
  shortName: string
}

export type PlainPhrase = {
  id: string
  body: string
  parentId: string
  type?: PhraseType
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

export type LoginDTO = {
  email: string
  password: string
}

export type LoginResponse = {
  apiMessage: {
    accessToken: string
    foundUser: boolean
    refreshToken: string
  }
  status: ResponseStatus
}

export enum UserRole {
  student = "student",
  teacher = "teacher",
}

export type SignupDTO = {
  name: string
  email: string
  password: string
  role: UserRole
}

export type SentenceDTO = Sentence

export type SentenceResponse = {
  apiMessage: unknown
  status: ResponseStatus
}
