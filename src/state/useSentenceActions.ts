import { useAtom } from "jotai"
import { currentSentenceAtom } from "./atoms"
import { Phrase, Sentence } from "@/lib/definitions"

/* type TuseSentenceActionsProps = {
  phraseId?: string
  parentPhraseId?: string
} */

export const useSentenceActions = (/* props: TuseSentenceActionsProps */) => {
  // const { phraseId, parentPhraseId } = props
  const [currentSentence, setCurrentSentence] = useAtom(currentSentenceAtom)

  const replaceCurrentSentence = (sentence: Sentence) => {
    setCurrentSentence(sentence)
  }

  const addPhrasesToCurrentSentence = (phrases: Phrase[]) => {
    setCurrentSentence((prev) => ({
      id: prev.id,
      phrases: [...prev.phrases, ...phrases],
    }))
  }

  return {
    currentSentence,
    replaceCurrentSentence,
    addPhrasesToCurrentSentence,
  }
}
