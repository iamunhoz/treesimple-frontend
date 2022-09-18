export interface Word {
  root?: string
  prefix?: string
  suffix?: string
  whole: string
}

export type Phrases = 'Noun' | 'Verb' | 'Adjective' | 'Preposition' | 'Determiner' | 'Adverb' | undefined

export interface PhraseInterface {
  head: Word | undefined
  tail?: PhraseInterface
}

export class Phrase {
  head: Word | undefined
  tail: PhraseInterface | undefined

  getHead():Word | undefined {
    return this.head
  }

  setHead(s: string) {
    this.head = this.convertStringToWordType(s) //metodo magico que define quem é head
  }

  convertStringToWordType(s: string):Word {
    return {
      whole: s
    }
  }

  /* constructor() {
    this.head = head
  } */
}