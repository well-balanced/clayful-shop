import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {},
) => {
  const stringVal =
    typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value)

  if ('maxAge' in options) {
    options.maxAge = Number.MAX_SAFE_INTEGER
    options.expires = new Date(Date.now() + options.maxAge)
  }

  res.setHeader('Set-Cookie', serialize(name, stringVal, options))
}
