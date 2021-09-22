import axios, { AxiosRequestConfig } from 'axios'
import { CLAYFUL_API_URL, CLAYFUL_ACCESS_TOKEN } from './config'
import logger from 'logger'

const instance = axios.create({
  baseURL: CLAYFUL_API_URL + '/v1',
  timeout: 10 * 1000,
  headers: {
    Authorization: `Bearer ${CLAYFUL_ACCESS_TOKEN}`,
    'Accept-Encoding': 'gzip',
    'Content-Type': 'application/json',
  },
})

interface GetPayload<T> {
  data?: T
  errorCode?: string
  statusCode: number
}

export const clayfulGet = async <T>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<GetPayload<T>> => {
  try {
    const res = await instance.get(path, config)
    return { data: res?.data, statusCode: res.status }
  } catch (e) {
    const { errorCode, statusCode, message } = e.response?.data
    logger.http(message)
    return { errorCode, statusCode }
  }
}

interface PostPayload<T> {
  data?: T
  errorCode?: string
  statusCode: number
}

export const clayfulPost = async <T>(
  path: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<PostPayload<T>> => {
  try {
    const res = await instance.post(path, data, config)
    return { data: res?.data, statusCode: res.status }
  } catch (e) {
    const { errorCode, statusCode, message } = e.response?.data
    logger.http(message)
    return { errorCode, statusCode }
  }
}

interface PutPayload<T> {
  data?: T
  errorCode?: string
  statusCode: number
}

export const clayfulPut = async <T>(
  path: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<PutPayload<T>> => {
  try {
    const res = await instance.put(path, data, config)
    return { data: res?.data, statusCode: res.status }
  } catch (e) {
    const { errorCode, statusCode, message } = e.response?.data
    logger.http(message)
    return { errorCode, statusCode }
  }
}

interface DeletePayload {
  errorCode?: string
  statusCode: number
}

export const clayfulDelete = async (path, config): Promise<DeletePayload> => {
  try {
    const res = await instance.delete(path, config)
    return { statusCode: res.status }
  } catch (e) {
    const { errorCode, statusCode, message } = e.response?.data
    logger.http(message)
    return { errorCode, statusCode }
  }
}
