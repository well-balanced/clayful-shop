import React, { useState, Dispatch, SetStateAction } from 'react'

type UseFormFieldsReturn<T, R> = [
  T,
  (key: keyof T) => (e: React.ChangeEvent<R>) => void,
  () => void,
]

function useFormFields<T, R = HTMLInputElement>(
  initialValues: T,
): UseFormFieldsReturn<T, R> {
  const [formFields, setFormFields] = useState<T>(initialValues)
  const createChangeHanlder = (key: keyof T) => (e: React.ChangeEvent<R>) => {
    // @ts-ignore
    const { value } = e.target
    setFormFields((prev: T) => ({ ...prev, [key]: value }))
  }
  const resetFormFields = () => {
    setFormFields(() => initialValues)
  }
  return [formFields, createChangeHanlder, resetFormFields]
}

export default useFormFields
