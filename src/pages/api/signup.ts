import type { NextApiRequest, NextApiResponse } from 'next'
import clayfulPost from 'utils/clayfulPost'

interface ClayfulPayload {
  address: {
    primary: any
    secondaries: any[]
  }
  connect: boolean
  verified: boolean
  groups: any[]
  userId: string | null
  alias: string | null
  email: string | null
  avatar: string | null
  gender: 'male' | 'female' | null
  birthdate: Date | null
  country: string | null
  mobile: string | null
  phone: string | null
  language: string | null
  currency: string | null
  timezone: string | null
  meta: any
}

interface Payload {
  data?: ClayfulPayload
  errorCode?: any
  statusCode?: any
}

async function handler(
  { body }: NextApiRequest,
  res: NextApiResponse<Payload>,
) {
  body.name = { full: body.name }
  const payload = await clayfulPost<ClayfulPayload>('/me', body)
  res.status(payload.statusCode).json(payload)
}

export default handler
