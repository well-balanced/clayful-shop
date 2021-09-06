import type { NextApiRequest, NextApiResponse } from 'next'
import clayfulPost from 'utils/clayfulPost'
import { setCookie } from 'utils/cookies'
import { takeCoverage } from 'v8'

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Payload>,
) {
  const { userId, password } = req.body
  const payload = await clayfulPost<ClayfulPayload>('/customers/auth', {
    ...(userId.includes('@') ? { email: userId } : { userId }),
    password,
  })
  if (payload.data && !req.cookies['token']) {
    setCookie(res, 'token', payload.data.token)
  }
  res.status(payload.statusCode).json(payload)
}
