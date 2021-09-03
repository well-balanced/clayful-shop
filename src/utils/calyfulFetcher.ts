import axios from 'axios'
import { CLAYFUL_API_URL, CLAYFUL_ACCESS_TOKEN } from './config'

const instance = axios.create({
  baseURL: CLAYFUL_API_URL + '/v1',
  timeout: 3000,
  headers: { Authorization: CLAYFUL_ACCESS_TOKEN },
})

export default async <T>(path: string, options: any): Promise<T> => {
  return (await instance.get(path, options)).data
}
