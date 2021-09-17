import { createContext, FC, useContext, useState } from 'react'

export interface Pricing {
  productId: string
  variantId: string
  price: number
  quantity: number
  totalPrice: number
  shippingMethodId: string
}

const PricingContext = createContext({
  pricings: [],
  setPricings: pricing => {},
  calculatePricings: pricing => {},
  deletePricing: (variantId: string) => {},
  findPricingByVariantId: (
    variantId: string,
    pricings: Pricing[],
  ): Pricing => ({
    shippingMethodId: '',
    productId: '',
    variantId: '',
    price: 0,
    quantity: 0,
    totalPrice: 0,
  }),
  total: 0,
  setTotal: total => {},
})

export const usePricingState = () => useContext(PricingContext)

export const PricingProvider: FC = ({ children }) => {
  const [pricings, setPricings] = useState<Pricing[]>([])
  const [total, setTotal] = useState(0)

  const calculatePricings = (pricing: Pricing) => {
    const newPricings = pricings.map(item =>
      item.variantId === pricing.variantId ? pricing : item,
    )
    const accumulated = newPricings.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0,
    )
    setPricings(newPricings)
    setTotal(accumulated)
  }

  const deletePricing = (variantId: string) => {
    const newPricings = pricings.filter(
      pricing => pricing.variantId !== variantId,
    )
    const accumulated = newPricings.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0,
    )
    setPricings(newPricings)
    setTotal(accumulated)
  }

  const findPricingByVariantId = (variantId: string, pricings: Pricing[]) => {
    const pricing = pricings.find(pricing => pricing.variantId === variantId)
    return pricing
  }

  return (
    <PricingContext.Provider
      value={{
        pricings,
        setPricings,
        calculatePricings,
        findPricingByVariantId,
        deletePricing,
        total,
        setTotal,
      }}
    >
      {children}
    </PricingContext.Provider>
  )
}
