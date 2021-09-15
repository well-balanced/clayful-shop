import React from 'react'
import { useOrderFormState } from 'screen/OrderScreen/OrderFormContext'
import OrderFormField from './OrderField'

export default function SenderFields() {
  const { formFields, createChangeHanlder } = useOrderFormState()
  return (
    <div>
      <div>주문자 정보</div>
      <OrderFormField
        label={'주문자명'}
        value={formFields['sendName']}
        onChange={createChangeHanlder('senderName')}
      />
      <OrderFormField
        label={'이메일'}
        value={formFields['senderEmail']}
        onChange={createChangeHanlder('senderEmail')}
      />
      <OrderFormField
        label={'연락처'}
        value={formFields['senderPhone']}
        onChange={createChangeHanlder('senderPhone')}
      />
    </div>
  )
}
