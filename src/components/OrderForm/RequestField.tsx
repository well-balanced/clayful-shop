import React from 'react'
import { useOrderFormState } from 'screen/OrderScreen/OrderFormContext'

export default function RequestField() {
  const { formFields, createChangeHandler } = useOrderFormState()
  return (
    <div>
      <div>요청사항</div>
      <textarea
        value={formFields['requestMessage']}
        placeholder={'요청사항을 입력해주세요.'}
        onChange={createChangeHandler('requestMessage')}
      />
    </div>
  )
}
