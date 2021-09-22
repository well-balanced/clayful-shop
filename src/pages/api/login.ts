import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulPost } from 'utils/clayful'
import { setCookie } from 'utils/cookies'
import { LoginPayload } from 'types/user'

interface Payload {
  data?: LoginPayload
  errorCode?: any
  statusCode?: any
}

async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const { userId, password } = req.body
  const payload = await clayfulPost<LoginPayload>('/customers/auth', {
    ...(userId.includes('@') ? { email: userId } : { userId }),
    password,
  })
  console.log({ payload })
  if (payload.data && !req.cookies['token']) {
    setCookie(res, 'token', payload.data.token)
  }
  res.status(payload.statusCode).json(payload)
}

export default handler
