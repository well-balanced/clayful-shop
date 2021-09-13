import { createContext, FC, useContext, Dispatch, SetStateAction } from 'react'

export interface Pricing {
  variantId: string
  price: number
  quantity: number
  totalPrice: number
}

const PricingContext = createContext({
  pricings: [],
  calculatePricings: (pricing: Pricing) => {},
  deletePricing: (variantId: string) => {},
  findPricingByVariantId: (
    variantId: string,
    pricings: Pricing[],
  ): Pricing => ({ variantId: '', price: 0, quantity: 0, totalPrice: 0 }),
})

export const usePricingState = () => useContext(PricingContext)

interface PriceProviderProps {
  pricings: Pricing[]
  calculatePricings: (pricing: Pricing) => void
  deletePricing: (variantId: string) => void
  findPricingByVariantId: (variantId: string, pricings: Pricing[]) => Pricing
}

export const PricingProvider: FC<PriceProviderProps> = ({
  children,
  pricings,
  calculatePricings,
  deletePricing,
  findPricingByVariantId,
}) => {
  return (
    <PricingContext.Provider
      value={{
        pricings,
        calculatePricings,
        findPricingByVariantId,
        deletePricing,
      }}
    >
      {children}
    </PricingContext.Provider>
  )
}
