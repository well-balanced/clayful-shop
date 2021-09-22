import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulPut, clayfulGet } from 'utils/clayful'
import { extractToken } from 'auth'
import { Customer } from 'types/user'

export interface Payload {
  data?: Customer
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const token = extractToken(req)
  if (req.method !== 'GET') {
    const payload = await clayfulPut<Customer>('/me', req.body, {
      headers: { 'Authorization-Customer': token },
    })
    return res.status(payload.statusCode).json(payload)
  }

  const payload = await clayfulGet<Customer>('/me', {
    headers: { 'Authorization-Customer': token },
  })
  return res.status(payload.statusCode).json(payload)
}

export default handler
