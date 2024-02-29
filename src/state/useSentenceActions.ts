import { useAtom, useSetAtom } from "jotai"
import { currentSentenceAtom, drawingLinesCoordinatesAtom } from "./atoms"
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
} from "@/lib/sentence"

export const useSentenceActions = () => {
  const [currentSentence, setCurrentSentence] = useAtom(currentSentenceAtom)
  const setDrawingLinesCoordinates = useSetAtom(drawingLinesCoordinatesAtom)

  const replaceCurrentSentence = (sentence: Sentence) => {
    setCurrentSentence(sentence)
  }

  const addPhrasesToCurrentSentence = (phrases: Phrase[]) => {
    setCurrentSentence((prev) => ({
      id: prev.id,
      phrases: [...prev.phrases, ...phrases],
    }))
  }

  const addLinesCoordinates = (lines: LinesCoordinates[]) => {
    setDrawingLinesCoordinates((prev) => [...prev, ...lines])
  }

  const sendSplitToState = (currentPhrase: Phrase, splitterIdx: number) => {
    const leftSide: Phrase = createLeftSideSplit(currentPhrase, splitterIdx)
    const rightSide: Phrase = createRigthSideSplit(
      currentPhrase,
      splitterIdx,
      leftSide.body.length
    )
    addPhrasesToCurrentSentence([leftSide, rightSide])
    addLinesCoordinates([
      {
        ...calculateParentXYLinePosition(currentPhrase),
        ...calculateThisPhraseXYLinePosition(leftSide),
      },
      {
        ...calculateParentXYLinePosition(currentPhrase),
        ...calculateThisPhraseXYLinePosition(rightSide),
      },
    ])
  }

  const setPhraseType = (phraseId: string, type: PhraseType) => {
    setCurrentSentence((prev) => ({
      id: prev.id,
      phrases: prev.phrases.map((phrase) =>
        phrase.id === phraseId ? { ...phrase, phraseType: type } : phrase
      ),
    }))
  }

  const resetAppState = () => {
    setCurrentSentence({
      id: "",
      phrases: [],
    })

    setDrawingLinesCoordinates([])
  }

  return {
    currentSentence,
    replaceCurrentSentence,
    addPhrasesToCurrentSentence,
    addLinesCoordinates,
    sendSplitToState,
    setPhraseType,
    resetAppState,
  }
}
