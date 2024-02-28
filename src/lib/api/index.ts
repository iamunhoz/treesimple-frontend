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
const makeRequest = async <T>(
  method: RequestMethod,
  path: string,
  body?: any
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await instance.request<T>({
      method,
      url: path,
      data: body,
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
}

enum ResponseStatus {
  sucesso = "sucesso",
  erro = "erro",
}

const queryClient = new QueryClient()

// Define functions for each HTTP method
const get = <T>(path: string): Promise<T> => makeRequest<T>("get", path)

const put = <T>(path: string, body: any): Promise<T> =>
  makeRequest<T>("put", path, body)

const post = <T>(path: string, body: any): Promise<T> =>
  makeRequest<T>("post", path, body)

const del = <T>(path: string, body?: any): Promise<T> =>
  makeRequest<T>("delete", path, body)

export { get, put, post, del, ApiPaths, queryClient, ResponseStatus }
