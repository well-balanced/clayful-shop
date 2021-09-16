export interface ClayfulGeneral {
  _id: string
  name: string
  slug: string
}

export interface ClayfulTotalPrice {
  price: {
    original: ClayfulPrice
    sale: ClayfulPrice
    withTax: ClayfulPrice
    withoutTax: ClayfulPrice
  }
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
