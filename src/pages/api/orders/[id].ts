import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulGet } from 'utils/clayful'
import { extractToken } from 'auth'
import { Order } from 'types/order'

export interface Payload {
  data?: Order
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const { id } = req.query
  const payload = await clayfulGet<Order>(`/orders/${id}`)
  res.status(payload.statusCode).json(payload)
}

export default handler
