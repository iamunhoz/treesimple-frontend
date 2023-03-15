import { TPhrase } from 'types/PhraseTypes'
import { create } from 'zustand'

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
    },
    startOver() {
      set(() => ({
        phrases: []
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
