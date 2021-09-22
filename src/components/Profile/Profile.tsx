import React, { useState } from 'react'
import { css } from '@emotion/react'
import { Customer } from 'types/user'
import useFormFields from 'hooks/useFormFields'
import ProfileForm from './ProfileForm'
import PasswordResetForm from './PasswordResetForm'
import BaseButton from 'components/BaseButton'
import { useSnackbar } from 'notistack'
import { useCookies } from 'react-cookie'
import Router from 'next/router'

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

const buttonWrapperStyle = css`
  display: flex;
`

interface ProfileProps {
  customer: Customer
}

export interface CustomerDisplayInfo {
  email: string
  name: string
  phone: string
  oldPassword: string
  newPassword: string
}

export default function Profile({ customer }: ProfileProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [, setCookie] = useCookies(['isAuth'])
  const [disabled, setDisabled] = useState<boolean>(true)
  const [formFields, createChangeHandler, _, setFormFields] =
    useFormFields<CustomerDisplayInfo>({
      email: customer.email,
      name: customer.name.full,
      phone: customer.phone,
      oldPassword: '',
      newPassword: '',
    })
  const [passwordReset, setPasswordReset] = useState<boolean>(false)

  const onEditButtonClick = async () => {
    setDisabled(prev => !prev)
    const body = JSON.stringify({
      name: { full: formFields.name },
      phone: formFields.phone,
    })

    const { data } = await fetch('api/me', { method: 'PUT', body }).then(r =>
      r.json(),
    )

    if (data) {
      setFormFields(prev =>
        Object.assign(prev, { name: data.name.full, phone: data.phone }),
      )
    }
  }

  const onResetPasswordButtonClick = async () => {
    setPasswordReset(prev => !prev)
    if (!passwordReset) return
    if (!formFields.oldPassword || !formFields.newPassword) {
      return alert('변경하실 비밀번호를 입력해주세요.')
    }

    const { oldPassword, newPassword } = formFields

    /**
     * Check old password is valid
     */
    const responseInCludesSecret = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        userId: customer.userId,
        password: oldPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(async ({ statusCode }) => {
        if (statusCode !== 200) {
          return
        }
        /**
         * Generate a secret token
         */
        const res = await fetch('/api/customers/verifications', {
          method: 'POST',
          body: JSON.stringify({
            userId: customer.userId,
            expiresIn: 60 * 60 * 10,
            scope: 'reset-password',
          }),
        })
        return await res.json()
      })

    if (!responseInCludesSecret || responseInCludesSecret.statusCode !== 200) {
      return enqueueSnackbar('비밀번호가 올바르지 않습니다.', {
        variant: 'error',
      })
    }

    const res = await fetch(`/api/customers/${customer._id}/password`, {
      method: 'PUT',
      body: JSON.stringify({
        secret: responseInCludesSecret?.data?.secret,
        password: newPassword,
      }),
    })

    if (!res || res.status !== 200) {
      return enqueueSnackbar('8자 이상의 유효한 비밀번호를 사용해주세요.', {
        variant: 'error',
      })
    }

    enqueueSnackbar(
      '성공적으로 비밀번호가 변경되었습니다. 다시 로그인해주세요.',
      {
        variant: 'success',
      },
    )
    setCookie('isAuth', false, { maxAge: 0 })
    Router.push('/login')
  }

  return (
    <div css={rootStyle}>
      <div css={titleStyle}>내 프로필</div>

      <div css={buttonWrapperStyle}>
        {passwordReset ? (
          <PasswordResetForm
            fields={formFields}
            createChangeHandler={createChangeHandler}
          />
        ) : (
          <ProfileForm
            fields={formFields}
            createChangeHandler={createChangeHandler}
            disabled={disabled}
          />
        )}

        <BaseButton onClick={onEditButtonClick}>
          {disabled ? '프로필 수정' : '수정완료'}
        </BaseButton>
        <BaseButton onClick={onResetPasswordButtonClick}>
          {passwordReset ? '수정 완료' : '비밀번호 수정'}
        </BaseButton>
      </div>
    </div>
  )
}
