import type { NextApiRequest, NextApiResponse } from 'next'
import clayfulGet from 'utils/clayfulGet'

export interface Product {
  _id: string
  name: string
  summary: string
  description: string
  thumbnail: {
    _id: string
    url: string
  }
  price: {
    original: PriceDetail
    sale: PriceDetail
  }
  shipping: ShippingDetail
}

export interface Payload {
  data?: Product[]
  errorCode?: any
  statusCode?: any
}

interface PriceDetail {
  raw: number
  convertedRaw: number
  formatted: string
  converted: string
}

interface ShippingMethod {
  _id: string
  name: string
  slug: string
}

interface ShippingDetail {
  methods: ShippingMethod[]
  calculation: string
}
async function handler(req: NextApiRequest, res: NextApiResponse<Payload>) {
  const fields = [
    '_id',
    'name',
    'summary',
    'description',
    'price',
    'discount.value',
    'discount.type',
    'shipping',
    'thumbnail',
  ]

  const payload = await clayfulGet<Product[]>('/products', {
    params: {
      limit: 1,
      fields: fields.join(','),
      page: req.query.page,
    },
  })

  res.status(payload.statusCode).json(payload)
}

export default handler
