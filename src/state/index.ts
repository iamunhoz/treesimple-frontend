import { Phrase } from 'types/PhraseTypes'
import create from 'zustand'
import { persist } from 'zustand/middleware'

type AppStore = {
  sentence: string | undefined
  setSentence: (sentence: string) => void
  showSentenceInput: boolean
  toggleSentenceInput: () => void
  setShowSentenceInput: (choice: boolean) => void
}

export const useAppStore = create<AppStore>((set) => ({
  showSentenceInput: true,
  setShowSentenceInput: (choice: boolean) => {
    set(() => ({ showSentenceInput: choice }))
  },
  toggleSentenceInput: () => {
    set((state) => ({ showSentenceInput: !state.showSentenceInput }))
  },
  sentence: undefined,
  setSentence(sentence) {
    set(() => ({ sentence }))
  }
}))

export type SyntaxStore = {
  phrases: Phrase[]
  addPhrase: (phrase: Phrase | undefined) => void
  getPhrase: (phraseId: string) => void
  removePhrase: (phraseId: string) => void
}

export const useSyntaxStore = create(
  persist(
    (set, get) => ({
      phrases: [],
      addPhrase(phrase: Phrase) {
        if (!phrase) return
        set((state: SyntaxStore) => ({ phrases: [...state.phrases, phrase] }))
      },
      getPhrase(phraseId: string) {
        return (get() as SyntaxStore).phrases.find(
          (phrase: Phrase) => phrase.self_id === phraseId
        )
      },
      removePhrase(phraseId: string) {
        set((state: SyntaxStore) => ({
          phrases: state.phrases.filter((phrase) => phrase.self_id !== phraseId)
        }))
      }
    }),
    {
      name: 'syntax-store',
      getStorage: () => localStorage,
      serialize: (state) => btoa(JSON.stringify(state)),
      deserialize: (str) => JSON.parse(atob(str))
    }
  )
)
