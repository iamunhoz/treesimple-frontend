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

function loopAndRemoveAllChildrenAndGrandChildren(
  phraseId: string,
  phrases: Phrase[]
) {
  let phrasesWithoutRemovedChildPhrases: Phrase[] = []
  const idsToRemove: string[] = []

  function loop(pId: string) {
    const foundChildrenWithThisParentId = phrases.filter(
      (phrase) => phrase.parentId === pId
    )

    if (!!foundChildrenWithThisParentId.length) {
      foundChildrenWithThisParentId.forEach((phrase) => {
        idsToRemove.push(phrase.id)
        loop(phrase.id)
      })
    } else {
      phrasesWithoutRemovedChildPhrases = phrases.filter(
        (phrase) => !idsToRemove.includes(phrase.id)
      )
    }
  }

  loop(phraseId)

  return phrasesWithoutRemovedChildPhrases
}

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

  const trimChildPhrases = (phraseId: string) => {
    const phrasesWithoutOldChildPhrases =
      loopAndRemoveAllChildrenAndGrandChildren(
        phraseId,
        currentSentence.phrases
      )
    console.log("phrasesWithoutOldChildPhrases", phrasesWithoutOldChildPhrases)

    if (!phrasesWithoutOldChildPhrases) return

    setCurrentSentence((prev) => ({
      id: prev.id,
      phrases: phrasesWithoutOldChildPhrases,
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
    trimChildPhrases,
    resetAppState,
  }
}
