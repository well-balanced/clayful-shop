import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulDelete, clayfulPost } from 'utils/clayful'
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
  if (req.method === 'DELETE') {
    const payload = await clayfulDelete('/me/cart/items', {
      headers: { 'Authorization-Customer': token },
      method: 'DELETE',
    })
    return res.status(payload.statusCode).json({})
  }

  const payload = await clayfulPost<ClayfulPayload>(
    '/me/cart/items',
    req.body,
    { headers: { 'Authorization-Customer': token } },
  )
  return res.status(payload.statusCode).json(payload)
}

export default handler

export const config = {
  api: {
    externalResolver: true,
  },
}
