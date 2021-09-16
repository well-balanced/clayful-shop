import useFormFields from 'hooks/useFormFields'
import React from 'react'
import SignupFormField from './SignupFormField'
import { useState } from 'react'
import Router from 'next/router'

const SignupForm = () => {
  const [error, setError] = useState(null)
  const [formFields, createChangeHandler, resetFormFields] = useFormFields({
    userId: '',
    email: '',
    password: '',
    name: '',
    phone: '',
  })

  if (error) return <div>{error}</div>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { errorCode } = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    }).then(res => res.json())
    errorCode ? setError(errorCode) : resetFormFields()
    Router.push('/login')
  }

  return (
    <form onSubmit={handleSubmit}>
      <SignupFormField
        label="이름"
        field="name"
        value={formFields.name}
        changeHandler={createChangeHandler}
      />
      <SignupFormField
        label="아이디"
        field="userId"
        value={formFields.userId}
        changeHandler={createChangeHandler}
      />
      <SignupFormField
        label="이메일"
        field="email"
        value={formFields.email}
        changeHandler={createChangeHandler}
      />
      <SignupFormField
        label="비밀번호"
        field="password"
        value={formFields.password}
        changeHandler={createChangeHandler}
      />
      <SignupFormField
        label="휴대폰 번호"
        field="phone"
        value={formFields.phone}
        changeHandler={createChangeHandler}
      />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default SignupForm
