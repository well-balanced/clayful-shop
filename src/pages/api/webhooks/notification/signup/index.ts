import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
  return res.status(200)
}

export default handler
