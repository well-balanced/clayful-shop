import useFormFields from 'hooks/useFormFields'
import React from 'react'
import SignupFormField from './SignupFormField'

const SignupForm = () => {
  const { formFields, createChangeHanlder } = useFormFields({
    userId: '',
    email: '',
    password: '',
    name: '',
    phone: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <SignupFormField
        label="이름"
        field="name"
        value={formFields.name}
        chnageHandler={createChangeHanlder}
      />
      <SignupFormField
        label="아이디"
        field="userId"
        value={formFields.userId}
        chnageHandler={createChangeHanlder}
      />
      <SignupFormField
        label="이메일"
        field="email"
        value={formFields.email}
        chnageHandler={createChangeHanlder}
      />
      <SignupFormField
        label="비밀번호"
        field="password"
        value={formFields.password}
        chnageHandler={createChangeHanlder}
      />
      <SignupFormField
        label="휴대폰 번호"
        field="phone"
        value={formFields.phone}
        chnageHandler={createChangeHanlder}
      />
    </form>
  )
}

export default SignupForm
