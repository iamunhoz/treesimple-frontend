"use client"

import { ApiPaths, ResponseStatus, post } from "@/lib/api"
import { LoginResponse, SignupDTO, UserRole } from "@/lib/definitions"
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
import Link from "next/link"
import { VerifiedUserOutlined } from "@mui/icons-material"

export default function Signup(): JSX.Element {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [retypedPassword, setRetypedPassword] = useState("")
  const [showBannerUserCreationSuccess, setShowBannerUserCreationSuccess] =
    useState(false)
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false)
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationKey: [ApiPaths.signup],
    mutationFn: async (dto: SignupDTO) => {
      const response = await post<LoginResponse>(ApiPaths.signup, dto)
      if (response.status === ResponseStatus.sucesso) {
        return
      } else if (response.status === ResponseStatus.erro) {
        throw new Error("unable to comply")
      }
    },
    onSuccess: () => {
      setShowBannerUserCreationSuccess(true)
      setTimeout(() => {
        router.push("/user/login")
      }, 3000)
    },
    onError: (error) => {
      console.error("user creation failed", { error })
    },
  })

  const handleSubmit = () => {
    if (password !== retypedPassword) {
      setPasswordsDontMatch(true)
      return
    }
    mutate({ email, password, name, role: UserRole.student })
  }

  const handleEnterKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
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
        <Typography variant="h4">Sign up</Typography>
        <TextField
          label="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleEnterKeyPress}
        />
        <TextField
          label="e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleEnterKeyPress}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          error={passwordsDontMatch}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleEnterKeyPress}
        />
        <TextField
          label="retype password"
          type="password"
          value={retypedPassword}
          error={passwordsDontMatch}
          onChange={(e) => setRetypedPassword(e.target.value)}
          onKeyDown={handleEnterKeyPress}
        />
        {showBannerUserCreationSuccess ? (
          <Alert
            icon={<VerifiedUserOutlined fontSize="inherit" />}
            severity="success"
          >
            Usuário criado. Redirecionando para login
          </Alert>
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Send
          </Button>
        )}
        {isPending && <CircularProgress />}

        <Typography>
          Already have an account?{" "}
          <Link href="/user/login">Click here to login</Link>
        </Typography>
      </Paper>
    </Box>
  )
}
