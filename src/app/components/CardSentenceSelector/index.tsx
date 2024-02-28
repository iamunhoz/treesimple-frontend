import { PlainSentence } from "@/lib/definitions"
import { convertPlainTreeToTreeWithCoordinates } from "@/lib/sentence"
import { useSentenceActions } from "@/state/useSentenceActions"
import { Button, Card, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

type CardSentenceSelectorProps = {
  sentence: PlainSentence
}
export function CardSentenceSelector(
  props: CardSentenceSelectorProps
): JSX.Element {
  const { sentence } = props

  const { replaceCurrentSentence, addLinesCoordinates } = useSentenceActions()
  const router = useRouter()

  const loadSentence = () => {
    const tree = convertPlainTreeToTreeWithCoordinates(sentence)
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
