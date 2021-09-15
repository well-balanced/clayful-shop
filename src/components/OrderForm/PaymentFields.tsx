import React from 'react'
import { useOrderFormState } from 'screen/OrderScreen/OrderFormContext'
import SelectFormField from 'components/SelectFormField'

export default function PaymentMethodFields() {
  const { createChangeHanlder } = useOrderFormState()
  return (
    <div>
      <div>결제</div>
      <SelectFormField
        label={'결제 수단'}
        options={['무통장입금']}
        onChange={createChangeHanlder('paymentMethod')}
      />
    </div>
  )
}
