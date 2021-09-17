import type { NextPage } from 'next'
import OrderScreen from 'screen/OrderScreen'
import { OrderFormProvider } from 'screen/OrderScreen/OrderFormContext'

const OrderPage: NextPage = () => {
  return (
    <OrderFormProvider>
      <OrderScreen />
    </OrderFormProvider>
  )
}

export default OrderPage
