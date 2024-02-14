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
  phrases: [
    {
      id: "1",
      body: "this is a model sentence",
      parentId: "model",
      x: 596.5,
      y: 25,
    },
    {
      id: "tqVYRi3J895IKgCfVww1h",
      body: "this is a",
      y: 100,
      x: 586.5,
      parentId: "1",
    },
    {
      id: "hKHjsSl8iIOuuP3B8VdJ6",
      body: "model sentence",
      y: 100,
      x: 704.5,
      parentId: "1",
    },
    {
      id: "iwlnvCIJ8cF8ZmGtfTFOw",
      body: "this",
      y: 175,
      x: 576.5,
      parentId: "tqVYRi3J895IKgCfVww1h",
    },
    {
      id: "uRcJnBW1kPuTtAMiMV5Zz",
      body: "is a",
      y: 175,
      x: 634.5,
      parentId: "tqVYRi3J895IKgCfVww1h",
    },
    {
      id: "ozajEYLS_AuUVlH8-1VyD",
      body: "is",
      y: 250,
      x: 624.5,
      parentId: "uRcJnBW1kPuTtAMiMV5Zz",
    },
    {
      id: "h_tUbvW2_-lUigOnUAl9E",
      body: "a",
      y: 250,
      x: 658.5,
      parentId: "uRcJnBW1kPuTtAMiMV5Zz",
    },
    {
      id: "CfpG1KQwxCLRxq375ZiYp",
      body: "model",
      y: 175,
      x: 694.5,
      parentId: "hKHjsSl8iIOuuP3B8VdJ6",
    },
    {
      id: "o3YEF76QsZ1wODCSONEPF",
      body: "sentence",
      y: 175,
      x: 764.5,
      parentId: "hKHjsSl8iIOuuP3B8VdJ6",
    },
  ],
})

export const drawingLinesCoordinatesAtom = atom<LinesCoordinates[]>([
  { parentX: 740.5, parentY: 55, x: 640.5, y: 100 },
  { parentX: 740.5, parentY: 55, x: 788.5, y: 100 },
  { parentX: 640.5, parentY: 130, x: 600.5, y: 175 },
  { parentX: 640.5, parentY: 130, x: 658.5, y: 175 },
  { parentX: 658.5, parentY: 205, x: 636.5, y: 250 },
  { parentX: 658.5, parentY: 205, x: 664.5, y: 250 },
  { parentX: 788.5, parentY: 130, x: 724.5, y: 175 },
  { parentX: 788.5, parentY: 130, x: 812.5, y: 175 },
])
