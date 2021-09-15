import React from 'react'
import { useOrderFormState } from 'screen/OrderScreen/OrderFormContext'
import OrderFormField from './OrderField'

export default function ReceiverFields() {
  const { formFields, createChangeHanlder } = useOrderFormState()
  return (
    <div>
      <div>수취자 정보</div>
      <OrderFormField
        label={'수취자명'}
        value={formFields['receiverName']}
        onChange={createChangeHanlder('receiverName')}
      />
      <OrderFormField
        label={'연락처'}
        value={formFields['receiverPhone']}
        onChange={createChangeHanlder('receiverPhone')}
      />
    </div>
  )
}
