"use client"

import {
  LinesCoordinates,
  Phrase,
  PhraseType,
  Sentence,
} from "@/lib/definitions"
import {
  calculateParentXYLinePosition,
  calculateThisPhraseXYLinePosition,
  createLeftSideSplit,
  createRigthSideSplit,
  loopAndRemoveAllChildrenAndGrandChildren,
} from "@/lib/sentence"
import { create } from "zustand"

interface AppState {
  currentSentence: Sentence
  drawingLinesCoordinates: LinesCoordinates[]
  jwt: string | undefined
}

interface AppActions {
  setJwt: (jwt: string | undefined) => void
  replaceCurrentSentence: (sentence: Sentence) => void
  addPhrasesToCurrentSentence: (phrases: Phrase[]) => void
  addLinesCoordinates: (lines: LinesCoordinates[]) => void
  sendSplitToState: (dto: {
    currentPhrase: Phrase
    splitterIdx: number
  }) => void
  setPhraseType: (phraseId: string, type: PhraseType) => void
  trimChildPhrases: ({ firstParentId }: { firstParentId: string }) => void
  resetAppState: () => void
}

export const useAppStore = create<AppState & AppActions>((set) => ({
  currentSentence: {
    id: "",
    phrases: [],
  },
  drawingLinesCoordinates: [],
  jwt: undefined,
  setJwt: (jwt) => {
    set(() => ({ jwt }))
    localStorage.setItem("jwt", String(jwt))
  },
  replaceCurrentSentence: (sentence) => {
    set(() => ({ currentSentence: sentence }))
  },
  addPhrasesToCurrentSentence: (phrases) => {
    set((state) => ({
      currentSentence: {
        id: state.currentSentence.id,
        phrases: [...state.currentSentence.phrases, ...phrases],
      },
    }))
  },
  addLinesCoordinates: (lines) => {
    set((state) => ({
      drawingLinesCoordinates: [...state.drawingLinesCoordinates, ...lines],
    }))
  },
  sendSplitToState: ({ splitterIdx, currentPhrase }) => {
    set((state) => {
      const leftSide: Phrase = createLeftSideSplit(currentPhrase, splitterIdx)
      const rightSide: Phrase = createRigthSideSplit(
        currentPhrase,
        splitterIdx,
        leftSide.body.length
      )

      return {
        currentSentence: {
          id: state.currentSentence.id,
          phrases: [...state.currentSentence.phrases, leftSide, rightSide],
        },
        drawingLinesCoordinates: [
          ...state.drawingLinesCoordinates,
          {
            phraseId: leftSide.id,
            ...calculateParentXYLinePosition(currentPhrase),
            ...calculateThisPhraseXYLinePosition(leftSide),
          },
          {
            phraseId: rightSide.id,
            ...calculateParentXYLinePosition(currentPhrase),
            ...calculateThisPhraseXYLinePosition(rightSide),
          },
        ],
      }
    })
  },
  setPhraseType: (phraseId, type) => {
    set((state) => ({
      currentSentence: {
        id: state.currentSentence.id,
        phrases: state.currentSentence.phrases.map((phrase) =>
          phrase.id === phraseId ? { ...phrase, phraseType: type } : phrase
        ),
      },
    }))
  },
  trimChildPhrases: ({ firstParentId }) => {
    set((state) => {
      const {
        phrasesWithoutRemovedChildPhrases,
        linesWithoutRemovedChildLines,
      } = loopAndRemoveAllChildrenAndGrandChildren(
        firstParentId,
        state.currentSentence.phrases,
        state.drawingLinesCoordinates
      )

      if (!phrasesWithoutRemovedChildPhrases) return state

      return {
        currentSentence: {
          id: state.currentSentence.id,
          phrases: phrasesWithoutRemovedChildPhrases,
        },
        drawingLinesCoordinates: linesWithoutRemovedChildLines,
      }
    })
  },
  resetAppState: () => {
    set(() => ({
      currentSentence: {
        id: "",
        phrases: [],
      },
      drawingLinesCoordinates: [],
    }))
  },
}))
