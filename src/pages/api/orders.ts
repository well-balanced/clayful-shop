import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulGet } from 'utils/clayful'
import { extractToken } from 'auth'
import { Orders } from 'types/order'

export interface Payload {
  data?: Orders
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const token = extractToken(req)
  const payload = await clayfulGet<Orders>('/orders', {
    headers: { 'Authorization-Customer': token },
  })
  res.status(payload.statusCode).json(payload)
}

export default handler
