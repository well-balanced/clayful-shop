import useFormFields from 'hooks/useFormFields'
import React from 'react'
import LoginFormField from './LoginFormField'
import { useState } from 'react'
import Router from 'next/router'
import { useUserInfo } from 'context/UserInfoContext'

const LoginForm = () => {
  const { userInfo, setUserInfo } = useUserInfo()
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
    setUserInfo({ ...userInfo, customer: data?.customer })

    errorCode ? setError(errorCode) : Router.push('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <LoginFormField
        label="아이디 혹은 이메일"
        field="userId"
        value={formFields['userId']}
        // @ts-ignore
        changeHandler={createChangeHanlder}
      />
      <LoginFormField
        label="비밀번호"
        field="password"
        value={formFields['password']}
        // @ts-ignore
        changeHandler={createChangeHanlder}
      />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default LoginForm
