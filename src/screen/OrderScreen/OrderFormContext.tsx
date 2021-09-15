import { createContext, FC, useContext, useState } from 'react'
import useFormFields from 'hooks/useFormFields'

export interface OrderFormFields {
  senderName: string
  senderEmail: string
  senderPhone: string
  receiverName: string
  receiverPhone: string
  shippingAddress: string
  additionalShippingAddress: string
  zipCode: string
  paymentMethod: string
  requestMessage: string
}

const OrderFormContext = createContext({
  formFields: {},
  createChangeHanlder: key => e => {},
})

export const useOrderFormState = () => useContext(OrderFormContext)

export const OrderFormProvider: FC = ({ children }) => {
  const [formFields, createChangeHanlder] = useFormFields<OrderFormFields>({
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    receiverName: '',
    receiverPhone: '',
    shippingAddress: '',
    additionalShippingAddress: '',
    zipCode: '',
    paymentMethod: '',
    requestMessage: '',
  })

  return (
    <OrderFormContext.Provider
      value={{
        formFields,
        createChangeHanlder,
      }}
    >
      {children}
    </OrderFormContext.Provider>
  )
}
