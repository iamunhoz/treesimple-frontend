import { ResponseStatus } from "../api"

export enum PhraseTypeCode {
  Sentence = "Sentence",
  NounP = "NounP",
  Noun = "Noun",
  VerbP = "VerbP",
  Verb = "Verb",
  AdjectiveP = "AdjectiveP",
  Adjective = "Adjective",
  PrepositionP = "PrepositionP",
  Preposition = "Preposition",
  DeterminerP = "DeterminerP",
  Determiner = "Determiner",
  AdverbP = "AdverbP",
  Adverb = "Adverb",
  undefined = "undefined",
}

export enum PhraseTypeShortCode {
  Sentence = "S",
  NounP = "NP",
  Noun = "N",
  VerbP = "VP",
  Verb = "V",
  AdjectiveP = "AdjP",
  Adjective = "Adj",
  PrepositionP = "PP",
  Preposition = "P",
  DeterminerP = "DP",
  Determiner = "D",
  AdverbP = "AdvP",
  Adverb = "Adv",
  undefined = "undefined",
}

export type PhraseType = {
  longName: string
  code: PhraseTypeCode
  shortCode: PhraseTypeShortCode
}

export type PlainPhrase = {
  id: string
  body: string
  parentId: string
  phraseType?: PhraseType
}

export type PhraseDTO = {
  id: string
  body: string
  parentId: string
  phraseType?: PhraseTypeCode
}

export type Coordinates = {
  x: number
  y: number
}

export type Phrase = PlainPhrase & Coordinates

/* export type PlainSentence = {
  id: string
  phrases: PlainPhrase[]
} */

export type Sentence = {
  id: string
  phrases: Phrase[]
}

export interface LinesCoordinates {
  x: number
  y: number
  parentX: number
  parentY: number
  phraseId: string
}

/* export type PlainTree = {
  sentence: PlainSentence
} */

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

export type SentenceDTO = {
  id: string
  phrases: PhraseDTO[]
}

export type SentenceResponse = {
  apiMessage: unknown
  status: ResponseStatus
}

export type GetSentenceResponse =
  | {
      status: ResponseStatus.sucesso
      apiMessage: SentenceDTO[]
    }
  | {
      status: ResponseStatus.erro
      apiMessage: unknown
    }
