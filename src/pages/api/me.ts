import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulGet } from 'utils/clayful'
import { extractToken } from 'auth'
import { Customer } from 'types/user'

export interface Payload {
  data?: Customer
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const token = extractToken(req)
  const payload = await clayfulGet<Customer>('/me', {
    headers: { 'Authorization-Customer': token },
  })
  res.status(payload.statusCode).json(payload)
}

export default handler
