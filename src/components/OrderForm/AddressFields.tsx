import React from 'react'
import { useOrderFormState } from 'screen/OrderScreen/OrderFormContext'
import BaseFormField from 'components/BaseFormField'

export default function AddressFields() {
  const { formFields, createChangeHanlder } = useOrderFormState()
  return (
    <div>
      <div>배송 주소</div>
      <BaseFormField
        label={'주소'}
        value={formFields['shippingAddress']}
        onChange={createChangeHanlder('shippingAddress')}
      />
      <BaseFormField
        label={'상세 주소'}
        value={formFields['additionalShippingAddress']}
        onChange={createChangeHanlder('additionalShippingAddress')}
      />
      <BaseFormField
        label={'우편번호'}
        value={formFields['zipCode']}
        onChange={createChangeHanlder('zipCode')}
      />
    </div>
  )
}
