"use client"

import { createTheme } from "@mui/material"
import { Poppins } from "next/font/google"
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700", "900"] })

export const overridedMuiTheme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: poppins.style.fontFamily,
    button: {
      textTransform: "none",
      color: "white",
      border: "2px solid orange",
    },
  },
})
