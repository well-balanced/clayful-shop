import useFormFields from 'hooks/useFormFields'
import React from 'react'
import LoginFormField from './LoginFormField'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const LoginForm = () => {
  const router = useRouter()
  const [, setCookie] = useCookies(['isAuth'])
  const [error, setError] = useState(null)
  const [formFields, createChangeHanlder] = useFormFields({
    userId: '',
    password: '',
  })

  if (error) return <div>{error}</div>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, errorCode } = await fetch('/api/login', {
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
    <form onSubmit={handleSubmit}>
      <LoginFormField
        label="아이디 혹은 이메일"
        field="userId"
        value={formFields['userId']}
        changeHandler={createChangeHanlder}
      />
      <LoginFormField
        label="비밀번호"
        field="password"
        value={formFields['password']}
        changeHandler={createChangeHanlder}
      />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default LoginForm
