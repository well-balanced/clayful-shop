import React, { useState } from 'react'

type UseFormFieldsReturn<T, R> = [
  T,
  (key: keyof T) => (e: React.ChangeEvent<R>) => void,
  () => void,
  React.Dispatch<React.SetStateAction<T>>,
]

function useFormFields<T, R = HTMLInputElement>(
  initialValues: T,
): UseFormFieldsReturn<T, R> {
  const [formFields, setFormFields] = useState<T>(initialValues)
  const createChangeHandler = (key: keyof T) => (e: React.ChangeEvent<R>) => {
    // @ts-ignore
    const { value } = e.target
    setFormFields((prev: T) => ({ ...prev, [key]: value }))
  }
  const resetFormFields = () => {
    setFormFields(() => initialValues)
  }
  return [formFields, createChangeHandler, resetFormFields, setFormFields]
}

export default useFormFields
