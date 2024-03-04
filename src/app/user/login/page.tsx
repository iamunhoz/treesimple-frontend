"use client"

import { ApiPaths, ResponseStatus, post } from "@/lib/api"
import { LoginDTO, LoginResponse } from "@/lib/definitions"
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { KeyboardEventHandler, useState } from "react"
import { NoAccountsOutlined } from "@mui/icons-material"
import { jwtDecode } from "jwt-decode"
import Link from "next/link"
import { useAppStore } from "@/state"

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userNotFound, setUserNotFound] = useState(false)
  const router = useRouter()
  const setJwt = useAppStore(({ setJwt }) => setJwt)

  const { mutate, isPending } = useMutation({
    mutationKey: [ApiPaths.login],
    mutationFn: async (dto: LoginDTO) => {
      const response = await post<LoginResponse, LoginDTO>({
        path: ApiPaths.login,
        dto,
      })
      if (response.status === ResponseStatus.sucesso) {
        setJwt(response.apiMessage.accessToken)

        console.log({ user: jwtDecode(response.apiMessage.accessToken) })

        setUserNotFound(false)
        return
      } else if (
        response.status === ResponseStatus.erro &&
        !response.apiMessage.foundUser
      ) {
        setJwt(undefined)
        setUserNotFound(true)
        throw new Error("unable to comply")
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
          minWidth: "400px",
          minHeight: "400px",
          padding: "40px",
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
        <Typography variant="h4">Login</Typography>

        <TextField
          label="e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Send
        </Button>
        {isPending && <CircularProgress />}
        {userNotFound && (
          <Alert
            icon={<NoAccountsOutlined fontSize="inherit" />}
            severity="error"
          >
            Nenhum cadastro encontrado com estas credenciais
          </Alert>
        )}
        <Typography>
          New Here? <Link href="/user/signup">Create an account</Link>
        </Typography>
      </Paper>
    </Box>
  )
}
