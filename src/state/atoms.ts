"use client"

import { LinesCoordinates, Sentence } from "@/lib/definitions"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// project data
export const currentSentenceAtom = atom<Sentence>({
  id: "",
  phrases: [],
})

export const drawingLinesCoordinatesAtom = atom<LinesCoordinates[]>([])

// system data
export const jwtAtom = atomWithStorage<string | undefined>("jwt", undefined)
