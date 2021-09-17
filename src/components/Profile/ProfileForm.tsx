import React from 'react'
import { CustomerDisplayInfo } from './Profile'
import BaseFormField from 'components/BaseFormField'

interface ProfileFormProps {
  fields: CustomerDisplayInfo
  createChangeHandler: (
    key: keyof CustomerDisplayInfo,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}

export default function ProfileForm({
  fields,
  createChangeHandler,
  disabled,
}: ProfileFormProps) {
  return (
    <div>
      <BaseFormField
        label={'이름'}
        value={fields['name']}
        onChange={createChangeHandler('name')}
        disabled={disabled}
      />
      <BaseFormField
        label={'이메일'}
        value={fields['email']}
        onChange={createChangeHandler('email')}
        disabled={disabled}
      />
      <BaseFormField
        label={'연락처'}
        value={fields['phone']}
        onChange={createChangeHandler('phone')}
        disabled={disabled}
      />
    </div>
  )
}
