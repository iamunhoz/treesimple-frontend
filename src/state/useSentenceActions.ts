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

  const addPhraseToCurrentSentence = (phrase: Phrase) => {
    setCurrentSentence((prev) => ({
      id: prev.id,
      phrases: [...prev.phrases, phrase],
    }))
  }

  return {
    currentSentence,
    replaceCurrentSentence,
    addPhraseToCurrentSentence,
  }
}
