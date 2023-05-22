import axios from 'axios'
import { LocalStorage } from 'services/crud/LocalStorage.ts'
import { baseURL } from './ip'

const ApiComToken = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

ApiComToken.interceptors.request.use((request) => {
  if (!request.headers) return request
  request.headers.Authorization = `Bearer ${LocalStorage.accessToken}`
  return request
})

export default ApiComToken
