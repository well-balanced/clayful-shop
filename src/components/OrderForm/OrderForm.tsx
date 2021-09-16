import React from 'react'
import { useOrderFormState } from 'screen/OrderScreen/OrderFormContext'
import { NEXT_PUBLIC_API_URL } from 'utils/config'
import AddressFields from './AddressFields'
import ReceiverFields from './ReceiverFields'
import RequestField from './RequestField'
import SenderFields from './SenderFields'
import PaymentFields from './PaymentFields'

export default function OrderForm() {
  const { formFields } = useOrderFormState()
  const onOrderSubmit = () => {
    const body = {
      currency: 'KRW',
      paymentMethod: 'bank-transfer',
      address: {
        shipping: {
          name: {
            first: formFields['receiverName'].slice(1),
            last: formFields['receiverName'][0],
            full: formFields['receiverName'],
          },
          postcode: formFields['zipCode'],
          country: 'KR',
          city: '서울특별시',
          address1: formFields['additionalShippingAddress'],
          phone: formFields['receiverPhone'],
        },
        billing: {
          name: {
            first: formFields['senderName'].slice(1),
            last: formFields['senderName'][0],
            full: formFields['senderName'],
          },
          postcode: formFields['zipCode'],
          country: 'KR',
          city: '서울특별시',
          address1: formFields['additionalShippingAddress'],
          phone: formFields['senderPhone'],
        },
      },
    }
    const res = fetch(`${NEXT_PUBLIC_API_URL}/api/checkout`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }
  return (
    <>
      <SenderFields />
      <ReceiverFields />
      <AddressFields />
      <PaymentFields />
      <RequestField />
      <button onClick={onOrderSubmit}>주문</button>
    </>
  )
}
