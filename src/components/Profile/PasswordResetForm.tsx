import React from 'react'
import { CustomerDisplayInfo } from './Profile'
import BaseFormField from 'components/BaseFormField'

interface PasswordResetFormProps {
  fields: CustomerDisplayInfo
  createChangeHandler: (
    key: keyof CustomerDisplayInfo,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PasswordResetForm({
  fields,
  createChangeHandler,
}: PasswordResetFormProps) {
  return (
    <div>
      <BaseFormField
        label={'이전 비밀번호'}
        value={fields['oldPassword']}
        onChange={createChangeHandler('oldPassword')}
        type="password"
      />
      <BaseFormField
        label={'새 비밀번호'}
        value={fields['newPassword']}
        onChange={createChangeHandler('newPassword')}
        type="password"
      />
    </div>
  )
}
