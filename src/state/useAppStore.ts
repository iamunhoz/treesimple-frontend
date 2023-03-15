import { nanoid } from 'nanoid'
import { TTree } from 'types/PhraseTypes'
import { create } from 'zustand'
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
