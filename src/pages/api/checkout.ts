import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulPost } from 'utils/clayful'
import { extractToken } from 'auth'

interface ClayfulPayload {
  order: any
}

interface Payload {
  data?: ClayfulPayload
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const token = extractToken(req)
  const payload = await clayfulPost<ClayfulPayload>(
    '/me/cart/checkout/order',
    req.body,
    { headers: { 'Authorization-Customer': token } },
  )
  return res.status(payload.statusCode).json(payload)
}

export default handler
