"use client"

import { ApiPaths, post } from "@/lib/api"
import { LoginDTO, LoginResponse } from "@/lib/definitions"
import { jwtAtom } from "@/state/atoms"
import { Box, Button, CircularProgress, Paper, TextField } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import { useRouter } from "next/navigation"
import { KeyboardEventHandler, useState } from "react"

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const setJwt = useSetAtom(jwtAtom)

  const { mutate, isPending } = useMutation({
    mutationKey: [ApiPaths.login],
    mutationFn: async (dto: LoginDTO) => {
      const response = await post<LoginResponse>(ApiPaths.login, dto)
      console.log({ response })

      if (response.status === "sucesso") {
        setJwt(response.apiMessage.accessToken)
      }
    },
    onSuccess: () => {
      router.push("/")
    },
  })

  const handleSubmit = () => {
    mutate({ email, password })
  }

  const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <Box
      sx={{ height: "100%" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        sx={{
          background: "white",
          width: "400px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",

          "& input": {
            height: "40px",
          },
        }}
      >
        <TextField
          label="e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Log In
        </Button>
        {isPending && <CircularProgress />}
      </Paper>
    </Box>
  )
}
