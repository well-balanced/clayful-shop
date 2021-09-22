import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulPost } from 'utils/clayful'
import { Order } from 'types/order'

interface ClayfulPayload {
  customer: string
  secret: string
  scope: string
}

export interface Payload {
  data?: ClayfulPayload
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const payload = await clayfulPost<ClayfulPayload>(
    `/customers/verifications`,
    req.body,
  )
  res.status(payload.statusCode).json(payload)
}

export default handler
