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
      limit: 6,
      fields: fields.join(','),
      page: req.query.page,
      q: '[iwgh]',
      search: 'name.ko',
      searchMatch: 'partial',
    },
  })
  payload.data = payload.data.map(attachResizingParams)

  res.status(payload.statusCode).json(payload)
}

export default handler

const attachResizingParams = (product: Product) => {
  /**
   * 썸네일 이미지 URL 뒤에 리사이징 파라미터 추가
   * */
  return {
    ...product,
    thumbnail: {
      ...product.thumbnail,
      url: product.thumbnail.url + '?width=240&height=240',
    },
  }
}
