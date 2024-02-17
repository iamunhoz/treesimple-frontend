import type { Metadata } from "next"
import "normalize.css"
import "./globals.css"
import { Header } from "./components"
import { Box, ThemeProvider } from "@mui/material"
import { overridedMuiTheme } from "@/lib/mui-theme"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"

export const metadata: Metadata = {
  title: "TreeSimple",
  description: "Generate Simple Syntax Tree for 101 classes",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ThemeProvider theme={overridedMuiTheme}>
          <Box
            component="body"
            sx={{
              width: "100svw",
              height: "100svh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",

              "& > *": {
                border: "2px solid orange",
              },

              "& header": {
                flex: 1,
              },

              "& main": {
                flex: 23,
              },
            }}
          >
            <Header />
            <main>{children}</main>
          </Box>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  )
}
