import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { WEBHOOK_URL } from 'utils/config'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await axios.post(WEBHOOK_URL, {
    text: '신규 고객 가입 완료',
  })
  return res.status(200).end()
}

export default handler
