"use client"

// import { currentSentenceAtom, drawingLinesCoordinatesAtom } from "@/state/atoms"
import { Box, Button } from "@mui/material"
import { useAtomValue } from "jotai"
import Link from "next/link"

export default function PlottingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const currentSentence = useAtomValue(currentSentenceAtom)
  // const drawingLinesCoordinate = useAtomValue(drawingLinesCoordinatesAtom)
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      <>{children}</>
      <Button
        LinkComponent={Link}
        href="/"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "white",
          fontSize: "1rem",
          width: "1.5rem",
          height: "2.4rem",
          p: 0,
        }}
      >
        Voltar
      </Button>
      {/* <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          fontSize: "1.5rem",
          color: "white",
        }}
      >
        {JSON.stringify(currentSentence)}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 150,
          left: 0,
          fontSize: "1.5rem",
          color: "white",
        }}
      >
        {JSON.stringify(drawingLinesCoordinate)}
      </Box> */}
    </Box>
  )
}
