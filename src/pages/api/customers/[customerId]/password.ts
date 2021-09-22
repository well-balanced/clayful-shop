import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulPut } from 'utils/clayful'
import { Order } from 'types/order'

export interface Payload {
  data?: Order
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const { customerId } = req.query
  const payload = await clayfulPut<Order>(
    `/customers/${customerId}/password`,
    req.body,
  )
  res.status(payload.statusCode).json(payload)
}

export default handler
