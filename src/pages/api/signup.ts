import type { NextApiRequest, NextApiResponse } from 'next'
import clayfulMatate from 'utils/clayfulMutate'

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

export default async function handler(
  { body }: NextApiRequest,
  res: NextApiResponse<Payload>,
) {
  body.name = { full: body.name }
  const { data, errorCode, statusCode } = await clayfulMatate<ClayfulPayload>(
    '/me',
    body,
  )

  const payload = { statusCode, data, errorCode }
  res.status(statusCode).json(payload)
}
