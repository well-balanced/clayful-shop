import {
  ClayfulPrice,
  ClayfulGeneral,
  ClayfulFormat,
  ClayfulThumbnail,
  ClayfulDate,
} from './common'

export interface ProductDetail {
  _id: string
  name: string
  keywords: string
  summary: string
  description: string
  origin: { name: string | null }
  price: {
    type: string
    original: ClayfulPrice
    sale: ClayfulPrice
  }
  discount: {
    type: string | null
    value: string | null
    discounted: ClayfulPrice
  }
  shipping: { methods: ClayfulGeneral[]; calculation: string }
  rating: {
    count: ClayfulFormat[]
    sum: ClayfulFormat[]
    average: ClayfulFormat[]
  }
  bundled: boolean
  available: boolean
  brand: ClayfulGeneral | null
  thumbnail: ClayfulThumbnail
  taxCategories: any[]
  totalReview: ClayfulFormat
  catalogs: CatalogDetail[]
  options: Option[]
  variants: Variant[]
  bundles: []
  meta: { spec: null; rate: null }
  createdAt: ClayfulDate
  updatedAt: ClayfulDate
  type: string
  slug: string
}

interface CatalogDetail {
  title: string
  description: string
  image: ClayfulThumbnail
}

export interface Option {
  name: string
  priority: number
  variations: Validation[]
  _id: string
}

interface Validation {
  value: string
  priority: number
  _id: string
}

export interface Variant {
  price: {
    original: ClayfulPrice
    sale: ClayfulPrice
  }
  discount: {
    type: string | null
    value: string | null
    discounted: ClayfulPrice
  }
  thumbnail: ClayfulThumbnail
  _id: string
  available: boolean
  types: VariantType[]
  quantity: ClayfulFormat
  sku: string
  types: VariantType[]
  weight: ClayfulFormat
  width: ClayfulFormat
  height: ClayfulFormat
  depth: ClayfulFormat
}

interface VariantType {
  option: { name: string; prooirity: number; _id: string }
  variation: { value: string; priority: number; _id: string }
}

export type ProductList = ProductDetail[]

export interface ProductDetail {
  _id: string
  name: string
  summary: string
  description: string
  thumbnail: ClayfulThumbnail
  price: {
    original: ClayfulPrice
    sale: ClayfulPrice
  }
  shipping: ShippingDetail
}

interface ShippingDetail {
  methods: ClayfulGeneral[]
  calculation: string
}

export interface ProductSummary {
  _id: string
  slug: string
  name: string
  thumbnail: { _id: string | null; url: string | null }
}
