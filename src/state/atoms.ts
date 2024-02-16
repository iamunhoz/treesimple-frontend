"use client"

import { LinesCoordinates, Sentence } from "@/lib/definitions"
import { atom } from "jotai"
import { getSentenceData } from "./sentence-examples"

export const currentSentenceAtom = atom<Sentence>({
  id: "model-2",
  phrases: [getSentenceData()],
})

export const drawingLinesCoordinatesAtom = atom<LinesCoordinates[]>([])
