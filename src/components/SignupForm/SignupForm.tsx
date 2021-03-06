import useFormFields from 'hooks/useFormFields'
import React from 'react'
import BaseFormField from 'components/BaseFormField'
import Router from 'next/router'
import BaseButton from 'components/BaseButton'
import { css } from '@emotion/react'
import { useSnackbar } from 'notistack'

const rootStyle = css`
  width: 150px;
  margin: 0 auto;
`

const SignupForm = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [formFields, createChangeHandler, resetFormFields] = useFormFields({
    userId: '',
    email: '',
    password: '',
    name: '',
    phone: '',
  })

  const handleSubmit = async () => {
    const { errorCode } = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    }).then(res => res.json())

    if (errorCode) {
      resetFormFields()
      return enqueueSnackbar('올바르지 않은 아이디 혹은 비밀번호입니다.', {
        variant: 'error',
      })
    }

    Router.push('/login')
  }

  return (
    <div css={rootStyle}>
      <BaseFormField
        label="이름"
        value={formFields.name}
        onChange={createChangeHandler('name')}
      />
      <BaseFormField
        label="아이디"
        value={formFields.userId}
        onChange={createChangeHandler('userId')}
      />
      <BaseFormField
        label="이메일"
        value={formFields.email}
        onChange={createChangeHandler('email')}
      />
      <BaseFormField
        label="비밀번호"
        value={formFields.password}
        onChange={createChangeHandler('password')}
        type="password"
      />
      <BaseFormField
        label="휴대폰 번호"
        value={formFields.phone}
        onChange={createChangeHandler('phone')}
      />
      <BaseButton onClick={handleSubmit}>회원가입</BaseButton>
    </div>
  )
}

export default SignupForm
