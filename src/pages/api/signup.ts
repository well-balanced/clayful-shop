import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulPost } from 'utils/clayful'
import { Customer } from 'types/user'

interface Payload {
  data?: Customer
  errorCode?: any
  statusCode?: any
}

async function handler(
  { body }: NextApiRequest,
  res: NextApiResponse<Payload>,
) {
  body.name = { full: body.name }
  const payload = await clayfulPost<Customer>('/me', body)
  res.status(payload.statusCode).json(payload)
}

export default handler
