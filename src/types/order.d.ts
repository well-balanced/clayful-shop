import { GeneralInfo } from './common'

export interface Orders {
  orders: Order[]
}

interface Order {
  _id: string
  currency: GeneralInfo
  tax: {}
  customer: {}
  address: {}
  total: {}
  synced: true
  done: false
  tags: []
  cancellation: null
  request: string
  arrivedAt: null
  syncTriedAt: null
  items: []
  language: {}
  status: string
  shipments: []
  fulfillments: []
  refunds: []
  transactions: []
  meta: {}
  createdAt: {}
  updatedAt: {}
}
