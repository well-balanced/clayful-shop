import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulPost } from 'utils/clayful'
import { extractToken } from 'auth'
import { CartItem, CartTotalPrice } from 'types'

interface ClayfulPayload {
  cart: {
    items: CartItem[]
    total: CartTotalPrice
  }
}

export interface Payload {
  data?: ClayfulPayload
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const token = extractToken(req)
  const payload = await clayfulPost<ClayfulPayload>('/me/cart', req.body, {
    headers: { 'Authorization-Customer': token },
  })
  res.status(payload.statusCode).json(payload)
}

export default handler
