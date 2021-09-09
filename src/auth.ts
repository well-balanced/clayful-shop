import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingHttpHeaders } from 'http'

export function extractToken(req: NextApiRequest) {
  let token: string | null

  token = extractTokenFromHeaders(req.headers || {})
  if (token) return token

  token = extractTokenFromCookies(req.cookies || {})
  if (token) return token

  return null
}

function extractTokenFromCookies(cookies: { [index: string]: string }) {
  return cookies['token']
}

function extractTokenFromHeaders({ authorization }: IncomingHttpHeaders) {
  if (!authorization) {
    return null
  }

  const parts =
    typeof authorization === 'string' ? authorization.split(' ') : authorization

  if (parts.length !== 2) {
    throw new Error('Format is Authorization: Bearer [token]')
  }

  const [scheme, credentials] = parts

  if (!/^Bearer$/i.test(scheme)) {
    throw new Error('Format is Authorization: Bearer [token]')
  }
  return credentials
}
