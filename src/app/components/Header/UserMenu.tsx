"use client"

import { isLoggedInFn } from "@/lib/system"
import { jwtAtom } from "@/state/atoms"
import { Box, BoxProps, Button, IconButton } from "@mui/material"
import { useAtomValue } from "jotai"
import Link from "next/link"

export function UserMenu(props: BoxProps): JSX.Element {
  const jwt = useAtomValue(jwtAtom)
  const isLoggedIn = isLoggedInFn(jwt)
  return (
    <Box
      className={props.className}
      sx={{
        "& a": {
          p: 0,
        },
      }}
    >
      {isLoggedIn ? (
        <IconButton>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="3"
              y1="12"
              x2="21"
              y2="12"
              stroke="rgb(var(--foreground-rgb))"
              strokeWidth="2"
            />
            <line
              x1="3"
              y1="6"
              x2="21"
              y2="6"
              stroke="rgb(var(--foreground-rgb))"
              strokeWidth="2"
            />
            <line
              x1="3"
              y1="18"
              x2="21"
              y2="18"
              stroke="rgb(var(--foreground-rgb))"
              strokeWidth="2"
            />
          </svg>
        </IconButton>
      ) : (
        <>
          <Button LinkComponent={Link} href="/user/login">
            Login
          </Button>
          <Button LinkComponent={Link} href="/user/signup">
            Signup
          </Button>
        </>
      )}
    </Box>
  )
}
