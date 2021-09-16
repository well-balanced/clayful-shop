import {
  ClayfulGeneral,
  ClayfulTotalPrice,
  ClayfulPrice,
  ClayfulFormat,
  ClayfulDate,
} from './common'
import { ProductSummary, Variant } from './product'

export interface CartItemPayload {
  cart: {
    items: CartItem[]
    total: ClayfulTotalPrice
  }
}

export interface CartItem {
  shippingMethod: ClayfulGeneral
  product: ProductSummary
  variant: Variant
  price: {
    original: ClayfulPrice
    sale: ClayfulPrice
  }
  discount: {
    type: string | null
    value: string | null
    discounted: ClayfulPrice
  }
  quantity: ClayfulFormat
  _id: string
  addedAt: ClayfulDate
  status: string
  brand: ClayfulGeneral
  collections: Collection[]
  total: ClayfulTotalPrice
}

interface Collection {
  path: ClayfulGeneral[]
}
