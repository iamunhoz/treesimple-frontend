import { Box } from "@mui/material"
import { ExplanationSection, SentenceInputSection } from "./components"

export default function Home() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr",
        height: "100%",

        "& .SentenceInputSection, & .ExplanationSection": {
          border: "2px solid orange",
          height: "100%",
        },
      }}
    >
      <SentenceInputSection />
      <ExplanationSection />
    </Box>
  )
}
