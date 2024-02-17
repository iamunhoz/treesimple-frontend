"use client"

import { PhraseType } from "@/lib/definitions"
import { PHRASE_TYPES_LIST } from "@/lib/sentence"
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Popover,
  Typography,
} from "@mui/material"
import { useRef, useState } from "react"

export function PhrasePin(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [phraseType, setPhraseType] = useState<PhraseType | undefined>()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <Box
      sx={{
        position: "absolute",
        top: -30,
        left: "50%",
        transform: "translateX(-50%)",
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
          <circle cx="12" cy="12" r="10" stroke="orange" stroke-width="2" />
          {phraseType && (
            <text
              x="50%"
              y="50%"
              dominant-baseline="middle"
              textAnchor="middle"
              fill="white"
              fontSize="1.2rem"
              fontFamily="Poppins"
            >
              {phraseType.shortName}
            </text>
          )}
        </svg>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "rgb(var(--background-rgb))",
            },
          },
        }}
      >
        <List
          sx={{
            p: 0,
            border: "2px solid orange",
            borderRadius: "5px",
            "& > *": { p: 0 },
          }}
          className="dark-bg-light-fg"
        >
          {PHRASE_TYPES_LIST.map((type, idx) => (
            <ListItem
              key={type.shortName}
              sx={{
                borderTop: idx > 0 ? "2px solid orange" : undefined,
                p: 0,
              }}
            >
              <Button
                variant="text"
                onClick={() => {
                  setPhraseType(type)
                  handleClose()
                }}
              >
                {type.shortName} - {type.longName}
              </Button>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  )
}
