import { Box, Typography } from "@mui/material"
import { UserMenu } from "./UserMenu"

export function Header(): JSX.Element {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        position: "relative",
        justifyContent: "center",

        "& .header-left": {
          position: "absolute",
          left: 0,
        },

        "& .header-right": {
          position: "absolute",
          right: 0,
        },
      }}
    >
      <Box className="header-left"></Box>
      <Typography className="header-center">header</Typography>
      <UserMenu className="header-right" />
    </Box>
  )
}
