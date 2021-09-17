import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulPost } from 'utils/clayful'
import { extractToken } from 'auth'

interface Payload {
  data?: {}
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const token = extractToken(req)
  const payload = await clayfulPost('/me/cart/checkout/order', req.body, {
    headers: { 'Authorization-Customer': token },
  })
  return res.status(payload.statusCode).json(payload)
}

export default handler
