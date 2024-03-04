import { useAppStore } from "@/state"
import { Box, IconButton } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

type BtnRemoveChildPhrasesProps = {
  phraseId: string
  setIsPhraseSplitted: Dispatch<SetStateAction<boolean>>
}
export function BtnRemoveChildPhrases(
  props: BtnRemoveChildPhrasesProps
): JSX.Element {
  const { phraseId, setIsPhraseSplitted } = props
  const trimChildPhrases = useAppStore(
    ({ trimChildPhrases }) => trimChildPhrases
  )

  const handleClick = () => {
    trimChildPhrases({ firstParentId: phraseId })
    setIsPhraseSplitted(false)
  }

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: -20,
        left: "50%",
        transform: "translateX(-50%)",

        "&:hover svg": {
          transform: "scale(1.5)",
        },
      }}
    >
      <IconButton onClick={handleClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="5"
            stroke="orange"
            strokeWidth="2"
            fill="orange"
          />
        </svg>
      </IconButton>
    </Box>
  )
}
