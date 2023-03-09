import { nanoid } from 'nanoid'
import { TPhrase, TTree } from 'types/PhraseTypes'
import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

type AppStore = {
  currentTree: TTree | undefined
  setCurrentTree: (payload: string | TTree) => void
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
  currentTree: undefined,
  setCurrentTree(payload) {
    set(() => {
      if (typeof payload === 'string') {
        return {
          currentTree: {
            fullSentence: payload,
            id: nanoid(),
            phrases: []
          }
        }
      } else {
        return { currentTree: payload }
      }
    })
  }
}))

export type TreeStore = {
  phrases: TPhrase[]
  addPhrase: (phrase: TPhrase[]) => void
  getPhrase: (phraseId: string) => void
  removePhrase: (phraseId: string) => void
}

export const useTreeStore = create<TreeStore>(
  // persist(
  (set, get) => ({
    phrases: [],
    addPhrase(phrase: TPhrase[]) {
      set((state: TreeStore) => ({ phrases: [...state.phrases, ...phrase] }))
    },
    getPhrase(phraseId: string) {
      return (get() as TreeStore).phrases.find(
        (phrase: TPhrase) => phrase.id === phraseId
      )
    },
    removePhrase(phraseId: string) {
      set((state: TreeStore) => ({
        phrases: state.phrases.filter((phrase) => phrase.id !== phraseId)
      }))
    }
    // TODO editPhrase(phraseId)
  }) /* ,
    caso queira salvar state zustand no localstorage para recuperar depois
    {
      name: 'syntax-store',
      getStorage: () => localStorage,
      serialize: (state) => btoa(JSON.stringify(state)),
      deserialize: (str) => JSON.parse(atob(str))
    }
  ) */
)
