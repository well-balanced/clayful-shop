import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulGet } from 'utils/clayful'
import { extractToken } from 'auth'
import { Orders } from 'types/order'
import { Customer } from 'types/user'

export interface Payload {
  data?: Orders
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const token = extractToken(req)
  const headers = { 'Authorization-Customer': token }
  const me = await clayfulGet<Customer>('/me', { headers })
  const payload = await clayfulGet<Orders>('/orders', {
    headers,
    params: {
      q: me.data.userId,
      search: 'customer.userId',
      searchMatch: 'exact',
    },
  })
  res.status(payload.statusCode).json(payload)
}

export default handler
