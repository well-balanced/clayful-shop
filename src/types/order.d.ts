import { Customer } from './user'
import {
  ClayfulAddress,
  ClayfulTotalPrice,
  ClayfulPrice,
  ClayfulFormattedPrice,
  ClayfulGeneral,
  ClayfulFormat,
  ClayfulCoupon,
  ClayfulDate,
} from './common'
import { ProductSummary, Variant } from './product'
import { Collection } from './cart'

export type Orders = Order[]

interface Order {
  _id: string
  currency: {}
  tax: {}
  customer: Customer
  address: {
    shipping: ClayfulAddress
    billing: ClayfulAddress
  }
  total: ClayfulTotalPrice
  synced: true
  done: false
  tags: []
  cancellation: null
  request: string
  arrivedAt: null
  syncTriedAt: null
  items: OrderItem[]
  language: {
    code: string
    name: string
  }
  status: string
  shipments: Shippment[]
  fulfillments: []
  refunds: []
  transactions: Transaction[]
  meta: {}
  createdAt: ClayfulDate
  updatedAt: ClayfulDate
}

interface OrderItem {
  total: {
    price: ClayfulFormattedPrice
    discounted: ClayfulPrice
    taxed: ClayfulPrice
  }
  price: ClayfulFormattedPrice
  brand: ClayfulGeneral
  shoppingMethod: ClayfulGeneral
  bundleItems: []
  product: ProductSummary
  variant: Variant
  quantity: ClayfulFormat
  _id: string
  type: string
  collections: Collection[]
  discounts: Discount[]
  discounted: ClayfulPrice
  taxes: Tax[]
  taxed: ClayfulPrice
}

interface Tax {
  name: string
  rate: ClayfulFormat
  taxed: ClayfulPrice
}

interface Discount {
  coupon: ClayfulCoupon
  type: string
  value: ClayfulFormat
  discounted: ClayfulPrice
  before: ClayfulPrice
  after: ClayfulPrice
}

interface Shippment {
  rule: {
    free: {
      priceOver: null
    }
    criteria: {
      price: ClayfulPrice
      weight: ClayfulFormat
    }
    weightOver: ClayfulFormat
    fee: ClayfulPrice
  }
  fee: ClayfulFormattedPrice
  items: OrderItem[]
  type: string
  shoppingPolicy: {
    _id: string
    method: ClayfulGeneral
    country: {
      code: string
      name: string
    }
    region: { name: string }
  }
  quantity: ClayfulFormat
  free: boolean
  discounts: Discount[]
  discounted: ClayfulPrice
  taxes: Tax[]
  taxed: ClayfulPrice
  _id: string
}

interface Transaction {
  paid: ClayfulPrice
  cancelled: ClayfulPrice
  refund: ClayfulPrice
  paymentMethod: ClayfulGeneral
  vbanks: []
  createdAt: ClayfulDate
  updatedAt: ClayfulDate
}
