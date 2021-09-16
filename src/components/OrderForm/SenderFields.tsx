import React from 'react'
import { useOrderFormState } from 'screen/OrderScreen/OrderFormContext'
import BaseFormField from 'components/BaseFormField'

export default function SenderFields() {
  const { formFields, createChangeHandler } = useOrderFormState()
  return (
    <div>
      <div>주문자 정보</div>
      <BaseFormField
        label={'주문자명'}
        value={formFields['senderName']}
        onChange={createChangeHandler('senderName')}
      />
      <BaseFormField
        label={'이메일'}
        value={formFields['senderEmail']}
        onChange={createChangeHandler('senderEmail')}
      />
      <BaseFormField
        label={'연락처'}
        value={formFields['senderPhone']}
        onChange={createChangeHandler('senderPhone')}
      />
    </div>
  )
}
