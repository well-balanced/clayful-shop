import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulPost } from 'utils/clayful'

interface Payload {
  data?: {}
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const { id } = req.query
  const payload = await clayfulPost(`/orders/${id}/refunds`, req.body, {})
  return res.status(payload.statusCode).json(payload)
}

export default handler
