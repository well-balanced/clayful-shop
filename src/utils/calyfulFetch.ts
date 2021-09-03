import axios, { AxiosRequestConfig } from 'axios'
import { CLAYFUL_API_URL, CLAYFUL_ACCESS_TOKEN } from './config'
import logger from 'logger'

const instance = axios.create({
  baseURL: CLAYFUL_API_URL + '/v1',
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${CLAYFUL_ACCESS_TOKEN}`,
    'Accept-Encoding': 'gzip',
  },
})

interface FetchPayload<T> {
  data?: T
  errorCode?: string
  statusCode: number
}

export default async <T>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<FetchPayload<T>> => {
  try {
    const res = await instance.get(path, config)
    return { data: res.data, statusCode: res.status }
  } catch (e) {
    const { errorCode, statusCode, message } = e.response.data
    logger.http(message)
    return { errorCode, statusCode }
  }
}
