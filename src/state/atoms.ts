"use client"

import { LinesCoordinates, Sentence } from "@/lib/definitions"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// project data
const currentSentenceAtom = atom<Sentence>({
  id: "",
  phrases: [],
})
currentSentenceAtom.debugLabel = "current-sentence"

const drawingLinesCoordinatesAtom = atom<LinesCoordinates[]>([])
drawingLinesCoordinatesAtom.debugLabel = "lines-coordinates"

// system data
const jwtAtom = atomWithStorage<string | undefined>("jwt", undefined)
jwtAtom.debugLabel = "jwt"

export { currentSentenceAtom, drawingLinesCoordinatesAtom, jwtAtom }
