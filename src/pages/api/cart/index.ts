import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulPost } from 'utils/clayful'
import { extractToken } from 'auth'
import { CartItemPayload } from 'types/cart'

export interface Payload {
  data?: CartItemPayload
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const token = extractToken(req)
  const payload = await clayfulPost<CartItemPayload>('/me/cart', req.body, {
    headers: { 'Authorization-Customer': token },
  })
  res.status(payload.statusCode).json(payload)
}

export default handler
