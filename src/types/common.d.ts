export interface ClayfulGeneral {
  _id: string
  name: string
  slug?: string
}

export interface ClayfulTotalPrice {
  price: ClayfulFormattedPrice
  discounted: ClayfulPrice
  taxed: ClayfulPrice
  amount?: ClayfulPrice
  items?: {
    price: {
      original: ClayfulPrice
      sale: ClayfulPrice
    }
    discounted: ClayfulPrice
  }
  shipping?: {
    fee: {
      original: ClayfulPrice
      sale: ClayfulPrice
    }
    discounted: ClayfulPrice
  }
  taxes?: { key: string; taxed: ClayfulPrice }[]
}

export interface ClayfulPrice {
  raw: number
  convertedRaw: number
  formatted: string
  converted: string
}

export interface ClayfulFormat {
  raw: number
  formatted: string
  converted: string
}

export interface ClayfulDate {
  raw: string
  formatted: string
  ago: string
}

export interface ClayfulThumbnail {
  _id: string | null
  url: string
}

export interface ClayfulAddress {
  name: { full: string }
  company: string
  address1: string
  address2: string
  mobile: string
  phone: string
  postcode: string
  country: {
    code: string
    name: string
  }
  state: string
  city: string
}

export interface ClayfulFormattedPrice {
  original: ClayfulPrice
  sale: ClayfulPrice
  withTax: ClayfulPrice
  withoutTax: ClayfulPrice
}

export interface ClayfulCoupon {
  _id: string
  name: string
  type: string
  discount: {
    type: string
    value: ClayfulFormat
  }
}
