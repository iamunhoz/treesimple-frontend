import { useAtom } from "jotai"
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
  phrases: Phrase[],
  linesCoordinates: LinesCoordinates[]
) {
  const idsToRemove: string[] = []
  let phrasesWithoutRemovedChildPhrases: Phrase[] = []
  let linesWithoutRemovedChildLines: LinesCoordinates[] = []

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
      linesWithoutRemovedChildLines = linesCoordinates.filter(
        (line) => !idsToRemove.includes(line.phraseId)
      )
    }
  }

  loop(phraseId)

  return { phrasesWithoutRemovedChildPhrases, linesWithoutRemovedChildLines }
}

export const useSentenceActions = () => {
  const [currentSentence, setCurrentSentence] = useAtom(currentSentenceAtom)
  const [drawingLinesCoordinates, setDrawingLinesCoordinates] = useAtom(
    drawingLinesCoordinatesAtom
  )

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

  const sendSplitToState = ({
    currentPhrase,
    splitterIdx,
  }: {
    currentPhrase: Phrase
    splitterIdx: number
  }) => {
    const leftSide: Phrase = createLeftSideSplit(currentPhrase, splitterIdx)
    const rightSide: Phrase = createRigthSideSplit(
      currentPhrase,
      splitterIdx,
      leftSide.body.length
    )
    addPhrasesToCurrentSentence([leftSide, rightSide])
    addLinesCoordinates([
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

  const trimChildPhrases = ({ firstParentId }: { firstParentId: string }) => {
    const { phrasesWithoutRemovedChildPhrases, linesWithoutRemovedChildLines } =
      loopAndRemoveAllChildrenAndGrandChildren(
        firstParentId,
        currentSentence.phrases,
        drawingLinesCoordinates
      )

    if (!phrasesWithoutRemovedChildPhrases) return

    setCurrentSentence((prev) => ({
      id: prev.id,
      phrases: phrasesWithoutRemovedChildPhrases,
    }))

    setDrawingLinesCoordinates(linesWithoutRemovedChildLines)
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
