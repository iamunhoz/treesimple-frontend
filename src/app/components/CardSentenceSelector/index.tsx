import { PlainSentence, SentenceDTO } from "@/lib/definitions"
import { convertSentenceDtoToTreeWithCoordinates } from "@/lib/sentence"
import { useSentenceActions } from "@/state/useSentenceActions"
import { Button, Card, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

type CardSentenceSelectorProps = {
  sentence: SentenceDTO
}
export function CardSentenceSelector(
  props: CardSentenceSelectorProps
): JSX.Element {
  const { sentence } = props

  const { replaceCurrentSentence, addLinesCoordinates } = useSentenceActions()
  const router = useRouter()

  const loadSentence = () => {
    const tree = convertSentenceDtoToTreeWithCoordinates(sentence)
    replaceCurrentSentence(tree.sentence)
    addLinesCoordinates(tree.lines)
    router.push("/plotting")
  }
  return (
    <Card
      component={Button}
      sx={{
        p: 1,

        "&:hover": {
          color: "white",
        },
      }}
      onClick={loadSentence}
    >
      <Typography variant="caption">{sentence.phrases[0].body}</Typography>
    </Card>
  )
}
