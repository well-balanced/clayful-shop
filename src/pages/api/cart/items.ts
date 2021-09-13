import type { NextApiRequest, NextApiResponse } from 'next'
import clayfulPost from 'utils/clayfulPost'
import { extractToken } from 'auth'

interface ClayfulPayload {
  customer: string
  token: string
  expiresIn: number
}

interface Payload {
  data?: ClayfulPayload
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const token = extractToken(req)
  const payload = await clayfulPost<ClayfulPayload>(
    '/me/cart/items',
    req.body,
    { headers: { 'Authorization-Customer': token } },
  )
  res.status(payload.statusCode).json(payload)
}

export default handler
