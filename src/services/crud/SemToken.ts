/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios'
import ApiSemToken from '../axios/ApiSemToken'

export class SemToken {
  static async get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return ApiSemToken.get(url, config)
      .then((response) => {
        if (response) return response
        return false
      })
      .catch((err) => err.response)
  }

  static async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return ApiSemToken.post(url, data, config)
      .then((response) => {
        if (response) return response
        return false
      })
      .catch((err) => err.response)
  }

  static async put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return ApiSemToken.put(url, data, config)
      .then((response) => {
        if (response) return response
        return false
      })
      .catch((err) => err.response)
  }

  static async remove(url: string, config?: AxiosRequestConfig): Promise<any> {
    return ApiSemToken.delete(url, config)
      .then((response) => {
        if (response) return response
        return false
      })
      .catch((err) => err.response)
  }
}
