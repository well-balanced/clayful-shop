import React from 'react'
import { useOrderFormState } from 'screen/OrderScreen/OrderFormContext'
import { NEXT_PUBLIC_API_URL } from 'utils/config'
import AddressFields from './AddressFields'
import ReceiverFields from './ReceiverFields'
import SenderFields from './SenderFields'
import PaymentFields from './PaymentFields'
import BaseButton from 'components/BaseButton'
import { css } from '@emotion/react'

const rootStyle = css`
  width: 100%;
  margin-bottom: 100px;
`

const flexBoxStyle = css`
  display: flex;
  > div {
    margin: 50px 50px 0 115px;
  }
`

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
    fetch(`${NEXT_PUBLIC_API_URL}/api/checkout`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }
  return (
    <div css={rootStyle}>
      <div css={flexBoxStyle}>
        <SenderFields />
        <AddressFields />
        <BaseButton onClick={onOrderSubmit}>주문</BaseButton>
      </div>
      <div css={flexBoxStyle}>
        <ReceiverFields />
        <PaymentFields />
      </div>
    </div>
  )
}
