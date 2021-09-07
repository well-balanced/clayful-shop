import useFormFields from 'hooks/useFormFields'
import React from 'react'
import LoginFormField from './LoginFormField'
import { useState } from 'react'
import Router from 'next/router'

const LoginForm = () => {
  const [error, setError] = useState(null)
  const { formFields, createChangeHanlder, resetFormFields } = useFormFields({
    userId: '',
    password: '',
  })

  if (error) return <div>{error}</div>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { errorCode } = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    }).then(res => res.json())

    errorCode ? setError(errorCode) : Router.push('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <LoginFormField
        label="아이디 혹은 이메일"
        field="userId"
        value={formFields.userId}
        chnageHandler={createChangeHanlder}
      />
      <LoginFormField
        label="비밀번호"
        field="password"
        value={formFields.password}
        chnageHandler={createChangeHanlder}
      />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default LoginForm