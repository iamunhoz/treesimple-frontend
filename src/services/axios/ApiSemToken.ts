import axios from 'axios'
import { baseURL } from './ip'

const ApiSemToken = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

export default ApiSemToken

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
