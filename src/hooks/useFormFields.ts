import { useState } from 'react'

function useFormFields<T>(initialValues: T) {
  const [formFields, setFormFields] = useState<T>(initialValues)
  const createChangeHanlder =
    (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setFormFields((prev: T) => ({ ...prev, [key]: value }))
    }
  return { formFields, createChangeHanlder }
}

export default useFormFields
