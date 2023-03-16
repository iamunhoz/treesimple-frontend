import { TPhrase } from 'types/PhraseTypes'
import { create } from 'zustand'

export type TreeStore = {
  phrases: TPhrase[]
  addPhrase: (phrase: TPhrase[]) => void
  getPhrase: (phraseId: string) => void
  editPhrase: (phraseId: string, payload: Partial<TPhrase>) => void
  removePhrase: (phraseId: string) => void
  startOver: () => void
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

    editPhrase(phraseId: string, payload: Partial<TPhrase>) {
      set((state: TreeStore) => {
        return {
          phrases: state.phrases.map((phrase) =>
            phrase.id === phraseId ? { ...phrase, ...payload } : phrase
          )
        }
      })
    },

    startOver() {
      set(() => ({
        phrases: []
      }))
    }
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
