import React, { useState } from 'react'
import { css } from '@emotion/react'
import { Customer } from 'types/user'
import useFormFields from 'hooks/useFormFields'
import ProfileForm from './ProfileForm'
import BaseButton from 'components/BaseButton'

const rootStyle = css`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 150px;
`

const titleStyle = css`
  font-size: 30px;
  margin: 30px;
  text-align: center;
`

interface ProfileProps {
  customer: Customer
}

export interface CustomerDisplayInfo {
  email: string
  name: string
  phone: string
}

export default function Profile({ customer }: ProfileProps) {
  const [disabled, setDisabled] = useState<boolean>(true)
  const [formFields, createChangeHandler] = useFormFields<CustomerDisplayInfo>({
    email: customer.email,
    name: customer.name.full,
    phone: customer.phone,
  })
  const onEditButtonClick = () => {
    setDisabled(prev => !prev)
    /**
     * TODO: update user informations
     */
  }

  return (
    <div css={rootStyle}>
      <div css={titleStyle}>내 프로필</div>
      <BaseButton onClick={onEditButtonClick}>
        {disabled ? '프로필 수정' : '수정완료'}
      </BaseButton>
      <ProfileForm
        fields={formFields}
        createChangeHandler={createChangeHandler}
        disabled={disabled}
      />
    </div>
  )
}
