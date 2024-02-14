import { useAtom, useSetAtom } from "jotai"
import { currentSentenceAtom, drawingLinesCoordinatesAtom } from "./atoms"
import { LinesCoordinates, Phrase, Sentence } from "@/lib/definitions"

/* type TuseSentenceActionsProps = {
  phraseId?: string
  parentPhraseId?: string
} */

export const useSentenceActions = (/* props: TuseSentenceActionsProps */) => {
  // const { phraseId, parentPhraseId } = props
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

  return {
    currentSentence,
    replaceCurrentSentence,
    addPhrasesToCurrentSentence,
    addLinesCoordinates,
  }
}
