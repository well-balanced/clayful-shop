import type { NextPage } from 'next'
import CartScreen from 'screen/CartScreen'
import { PricingProvider } from 'components/CartItem/PricingContext'

const CartPage: NextPage = () => {
  return (
    <PricingProvider>
      <CartScreen />
    </PricingProvider>
  )
}

export default CartPage
