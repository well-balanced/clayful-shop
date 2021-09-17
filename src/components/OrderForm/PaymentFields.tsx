import React from 'react'
import { useOrderFormState } from 'screen/OrderScreen/OrderFormContext'
import SelectFormField from 'components/SelectFormField'
import BaseFormField from 'components/BaseFormField'

export default function PaymentMethodFields() {
  const { formFields, createChangeHandler } = useOrderFormState()
  return (
    <div>
      <div>결제</div>
      <SelectFormField
        label={'결제 수단'}
        options={['무통장입금']}
        onChange={createChangeHandler('paymentMethod')}
      />
      <BaseFormField
        label="요청사항"
        value={formFields['requestMessage']}
        onChange={createChangeHandler('requestMessage')}
      />
    </div>
  )
}
