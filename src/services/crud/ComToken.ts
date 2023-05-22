/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios'
import ApiComToken from '../axios/ApiComToken'

export class ComToken {
  static async get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return ApiComToken.get(url, config)
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
    return ApiComToken.post(url, data, config)
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
    return ApiComToken.put(url, data, config)
      .then((response) => {
        if (response) return response
        return false
      })
      .catch((err) => err.response)
  }

  static async remove(url: string, config?: AxiosRequestConfig): Promise<any> {
    return ApiComToken.delete(url, config)
      .then((response) => {
        if (response) return response
        return false
      })
      .catch((err) => err.response)
  }
}
