"use client"

import { ApiPaths, ResponseStatus, post } from "@/lib/api"
import { Sentence, SentenceDTO, SentenceResponse } from "@/lib/definitions"
import { convertSentenceWithCoordinatesToSentenceDTO } from "@/lib/sentence"
import { currentSentenceAtom } from "@/state/atoms"
import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useAtomValue } from "jotai"

export function BtnSaveSentence() {
  const sentence = useAtomValue(currentSentenceAtom)
  const { mutate, isPending } = useMutation({
    mutationKey: [ApiPaths.sentence],
    mutationFn: async (sentence: Sentence) => {
      const dto = convertSentenceWithCoordinatesToSentenceDTO(sentence)
      const response = await post<SentenceResponse, SentenceDTO>({
        path: ApiPaths.sentence,
        dto,
        sendAuth: true,
      })
      if (response.status === ResponseStatus.sucesso) {
        return response
      } else if (response.status === ResponseStatus.erro) {
        throw new Error("unable to comply")
      }
    },
    onSuccess: (res) => {
      console.log("succes", { res })
    },
    onError: (error) => {
      console.error("user creation failed", { error })
    },
  })

  const handleSalvar = () => {
    mutate(sentence)
  }

  return (
    <Button
      variant="contained"
      onClick={handleSalvar}
      unselectable={isPending ? "on" : "off"}
    >
      Salvar
    </Button>
  )
}

/* function BtnSaveSentenceQueryContainer(props: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
} */
