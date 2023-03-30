import axios from 'axios'
import { baseURL } from './ip'

const ApiSemToken = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

export default ApiSemToken
