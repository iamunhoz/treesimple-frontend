import { QueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

// Define base URL or any other configuration you may need
//const baseURL = "https://tree-simple-server.up.railway.app" // Replace with your API base URL
const baseURL =
  // @ts-ignore
  process.env.NEXT_PUBLIC_TREE_SIMPLE_API_HOST &&
  process.env.NEXT_PUBLIC_TREE_SIMPLE_API_HOST === "localhost"
    ? "http://localhost:3003"
    : "https://tree-simple-server.up.railway.app"
// Create Axios instance with base URL

const instance = axios.create({
  baseURL,
})

// Define function to handle errors
const handleError = (error: any) => {
  console.error("Request failed:", error)
  throw error
}

// Define types for request methods
type RequestMethod = "get" | "put" | "post" | "delete"

// Define generic function to make requests
type MakeRequestParams<D> = {
  method: RequestMethod
  path: string
  dto?: D
  sendAuth?: boolean
}
const makeRequest = async <T, D>({
  method,
  path,
  dto,
  sendAuth,
}: MakeRequestParams<D>): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await instance.request<T>({
      method,
      url: path,
      data: dto,
      headers: sendAuth
        ? {
            Authorization: `Bearer ${localStorage
              .getItem("jwt")
              ?.replaceAll('"', "")}`,
          }
        : {},
    })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

enum ApiPaths {
  user = "user",
  login = "user/login",
  signup = "user/signup",
  sentence = "sentence",
}

enum ResponseStatus {
  sucesso = "sucesso",
  erro = "erro",
}

const queryClient = new QueryClient()

// Define functions for each HTTP method
const get = <T>({
  path,
  sendAuth,
}: {
  path: string
  sendAuth?: boolean
}): Promise<T> => makeRequest<T, {}>({ method: "get", path, sendAuth })

const put = <T, D>({
  path,
  dto,
  sendAuth,
}: {
  path: string
  dto: D
  sendAuth?: boolean
}): Promise<T> => makeRequest<T, D>({ method: "put", path, dto, sendAuth })

const post = <T, D>({
  path,
  dto,
  sendAuth,
}: {
  path: string
  dto: D
  sendAuth?: boolean
}): Promise<T> => makeRequest<T, D>({ method: "post", path, dto, sendAuth })

const del = <T, D>({
  path,
  dto,
  sendAuth,
}: {
  path: string
  dto?: D
  sendAuth?: boolean
}): Promise<T> => makeRequest<T, D>({ method: "delete", path, dto, sendAuth })

export { get, put, post, del, ApiPaths, queryClient, ResponseStatus }
