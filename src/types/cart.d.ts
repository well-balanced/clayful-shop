export interface CartItemPayload {
  cart: {
    items: CartItem[]
    total: ClayfulTotalPrice
  }
}

export interface CartItem {
  shippingMethod: ClayfulGeneral
  product: Product
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

interface Product {
  _id: string
  slug: string
  name: string
  thumbnail: { _id: string | null; url: string | null }
}
