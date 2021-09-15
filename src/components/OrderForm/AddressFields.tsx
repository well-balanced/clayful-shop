import React from 'react'
import { useOrderFormState } from 'screen/OrderScreen/OrderFormContext'
import OrderFormField from './OrderField'

export default function AddressFields() {
  const { formFields, createChangeHanlder } = useOrderFormState()
  return (
    <div>
      <div>배송 주소</div>
      <OrderFormField
        label={'주소'}
        value={formFields['shippingAddress']}
        onChange={createChangeHanlder('shippingAddress')}
      />
      <OrderFormField
        label={'상세 주소'}
        value={formFields['additionalShippingAddress']}
        onChange={createChangeHanlder('additionalShippingAddress')}
      />
      <OrderFormField
        label={'우편번호'}
        value={formFields['zipCode']}
        onChange={createChangeHanlder('zipCode')}
      />
    </div>
  )
}
