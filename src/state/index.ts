import create from 'zustand'

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
