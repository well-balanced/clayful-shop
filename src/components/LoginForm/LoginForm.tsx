import useFormFields from 'hooks/useFormFields'
import React from 'react'
import BaseFormField from 'components/BaseFormField'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import BaseButton from 'components/BaseButton'
import { css } from '@emotion/react'

const rootStyle = css`
  width: 150px;
  margin: 0 auto;
`

const LoginForm = () => {
  const router = useRouter()
  const [, setCookie] = useCookies(['isAuth'])
  const [error, setError] = useState(null)
  const [formFields, createChangeHandler] = useFormFields({
    userId: '',
    password: '',
  })

  if (error) return <div>{error}</div>

  const handleSubmit = async () => {
    const { errorCode } = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    }).then(res => res.json())
    errorCode ? setError(errorCode) : router.push('/')
    setCookie('isAuth', true, { maxAge: Number.MAX_SAFE_INTEGER })
  }

  return (
    <div css={rootStyle}>
      <BaseFormField
        label="아이디 혹은 이메일"
        value={formFields['userId']}
        onChange={createChangeHandler('userId')}
      />
      <BaseFormField
        label="비밀번호"
        value={formFields['password']}
        onChange={createChangeHandler('password')}
        type="password"
      />
      <BaseButton onClick={handleSubmit}>로그인</BaseButton>
    </div>
  )
}

export default LoginForm
