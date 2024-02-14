"use client"

import { LinesCoordinates, Sentence } from "@/lib/definitions"
import { atom } from "jotai"

const getSentenceData = () => {
  const phrase = {
    id: "1",
    body: "this is a model sentence",
    parentId: "model",
    x: 0,
    y: 25,
  }

  phrase.x = window.innerWidth / 2 - phrase.body.length * 6

  return phrase
}

export const currentSentenceAtom = atom<Sentence>({
  id: "model",
  phrases: [getSentenceData()],
})

export const drawingLinesCoordinatesAtom = atom<LinesCoordinates[]>([])
