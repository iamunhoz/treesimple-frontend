export type TPhraseType =
  | 'Sentence'
  | 'NounP'
  | 'VerbP'
  | 'AdjectiveP'
  | 'PrepositionP'
  | 'DeterminerP'
  | 'AdverbP'
  | undefined

export type TTree = {
  fullSentence: string
  id: string
  phrases: TPhrase[]
}

export type TPhrase = {
  id: string
  parentId?: string | null
  leftChildId?: string | null
  rightChildId?: string | null
  body: string
  head?: string | null
  // role: PhraseRole
  type?: TPhraseType | null
  width?: number
  positionX?: number
  positionY?: number
  topAnchor?: Coord
  bottomAnchor?: Coord
}

export type Coord = {
  x: number
  y: number
}
/*
type PhraseConstructor = {
  phrase: string
  parentId: string | null
  role: PhraseRole
} */
/*
export class Phrase {
  // a sentença ou frase inserida na criação do obj
  phrase: string
  //este sintagma é uma sentença (não tem parent), nucleo (tem sibling), complemento(tem sibling) ou átomo(não tem children)?
  role: PhraseRole
  // as duas children que cada sintagma pode ter (nem todo sintagma tem children)
  childHead?: Phrase //Word | undefined
  childTail?: Phrase //PhraseInterface | undefined
  // id para relacionar sintagmas entre si. A sentença global é o unico sintagma
  // com parentId null
  parentId: string | null
  // this id
  self_id: string

  getPhrase(): string {
    return this.phrase
  }

  getSelfId(): string {
    return this.self_id
  }

  getHead(): Phrase | undefined {
    return this.childHead
  }

  //ação humana invoca essa fn
  setHead(s: string) {
    this.childHead = new Phrase({
      phrase: s,
      parentId: this.self_id,
      role: 'head'
    })
  }

  getTail(): Phrase | undefined {
    return this.childTail
  }

  //ação humana invoca essa fn
  setTail(s: string) {
    this.childTail = new Phrase({
      phrase: s,
      parentId: this.self_id,
      role: 'tail'
    })
  }

  convertStringToWordType(s: string): Word {
    return {
      whole: s
    }
  }

  constructor(payload: PhraseConstructor) {
    this.phrase = payload.phrase
    this.parentId = payload.parentId
    this.role = payload.role
    this.self_id = nanoid(2)
  }
} */

// import { nanoid } from 'nanoid'

/* export interface Word {
  root?: string
  prefix?: string
  suffix?: string
  whole: string
} */

// export type PhraseRole = 'head' | 'tail' | 'sentence' | 'atom'

/* export interface PhraseInterface {
  head: Word | undefined
  tail?: PhraseInterface
} */
