import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulDelete, clayfulPost } from 'utils/clayful'
import { extractToken } from 'auth'

interface Payload {
  data?: {}
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const token = extractToken(req)
  const headers = { 'Authorization-Customer': token }

  if (req.method === 'DELETE') {
    const payload = await clayfulDelete('/me/cart/items', {
      headers,
      method: 'DELETE',
    })
    return res.status(payload.statusCode).end()
  }

  const payload = await clayfulPost('/me/cart/items', req.body, { headers })
  return res.status(payload.statusCode).json({})
}

export default handler

export const config = {
  api: {
    externalResolver: true,
  },
}
