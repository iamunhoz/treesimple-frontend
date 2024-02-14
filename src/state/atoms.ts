import { Sentence } from "@/lib/definitions"
import { atom } from "jotai"

export const currentSentenceAtom = atom<Sentence>({ id: "", phrases: [] })
