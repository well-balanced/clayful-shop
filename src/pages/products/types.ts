export interface ProductDetail {
  _id: string
  name: string
  keywords: string
  summary: string
  description: string
  origin: { name: string | null }
  price: {
    type: string
    original: PriceDetail
    sale: PriceDetail
  }
  discount: {
    type: string | null
    value: string | null
    discounted: PriceDetail
  }
  shipping: { methods: GeneralInfo[]; calculation: string }
  rating: {
    count: RatingDetail[]
    sum: RatingDetail[]
    average: RatingDetail[]
  }
  bundled: boolean
  available: boolean
  brand: GeneralInfo | null
  thumbnail: {
    _id: string
    url: string
  }
  taxCategories: any[]
  totalReview: RatingDetail
  catalogs: CatelogDetail[]
  options: OptionDetail[]
  variants: VariantDetail[]
  bundles: []
  meta: { spec: null; rate: null }
  createdAt: DateDetail
  updatedAt: DateDetail
  type: string
  slug: string
}

interface PriceDetail {
  raw: number
  convertedRaw: number
  formatted: string
  converted: string
}

interface GeneralInfo {
  _id: string
  name: string
  slug: string
}

interface RatingDetail {
  raw: number
  formatted: string
  converted: string
}

interface CatelogDetail {
  title: string
  description: string
  image: {
    _id: string
    url: string
  }
}

export interface OptionDetail {
  name: string
  priority: number
  variations: ValidationDetail[]
  _id: string
}

interface ValidationDetail {
  value: string
  priority: number
  _id: string
}

interface DateDetail {
  raw: string
  formatted: string
  ago: string
}

interface VariantDetail {
  _id: string
  available: boolean
  types: VariantTypeDetail[]
}

interface VariantTypeDetail {
  option: { name: string; prooirity: number; _id: string }
  variation: { value: string; priority: number; _id: string }
}
