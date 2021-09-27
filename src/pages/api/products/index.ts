import type { NextApiRequest, NextApiResponse } from 'next'
import { clayfulGet } from 'utils/clayful'
import { ProductList, ProductDetail } from 'types/product'

export interface Payload {
  data?: ProductList
  errorCode?: any
  statusCode?: any
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

  const payload = await clayfulGet<ProductList>('/products', {
    params: {
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

const attachResizingParams = (product: ProductDetail) => {
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
