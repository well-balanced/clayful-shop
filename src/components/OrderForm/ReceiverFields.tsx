import React from 'react'
import { useOrderFormState } from 'screen/OrderScreen/OrderFormContext'
import BaseFormField from 'components/BaseFormField'

export default function ReceiverFields() {
  const { formFields, createChangeHandler } = useOrderFormState()
  return (
    <div>
      <div>수취자 정보</div>
      <BaseFormField
        label={'수취자명'}
        value={formFields['receiverName']}
        onChange={createChangeHandler('receiverName')}
      />
      <BaseFormField
        label={'연락처'}
        value={formFields['receiverPhone']}
        onChange={createChangeHandler('receiverPhone')}
      />
    </div>
  )
}
