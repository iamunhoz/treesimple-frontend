import { ApiPaths, ResponseStatus, get } from "@/lib/api"
import { GetSentenceResponse, PlainSentence } from "@/lib/definitions"
import { Box } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { CardSentenceSelector } from "../CardSentenceSelector"

export function ExplanationSection(): JSX.Element {
  const { data } = useQuery({
    queryKey: [ApiPaths.sentence],
    queryFn: async () => {
      const response = await get<GetSentenceResponse>({
        path: ApiPaths.sentence,
        sendAuth: true,
      })

      if (response.status === ResponseStatus.sucesso) {
        return response.apiMessage
      }

      return []
    },
  })
  return (
    <Box
      className="ExplanationSection"
      sx={{
        p: 2,
        display: "flex",
        alignItems: "start",
        gap: "10px",
      }}
    >
      {data?.map((sentence) => (
        <CardSentenceSelector sentence={sentence} key={sentence.id} />
      ))}
    </Box>
  )
}
