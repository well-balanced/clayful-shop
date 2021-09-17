import { createContext, FC, useContext, useEffect } from 'react'
import useFormFields from 'hooks/useFormFields'
import useSWR from 'swr'
import { Payload as UserPayload } from 'pages/api/me'

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
  city: string
}

const OrderFormContext = createContext({
  formFields: {},
  createChangeHandler: key => e => {},
})

export const useOrderFormState = () => useContext(OrderFormContext)

export const OrderFormProvider: FC = ({ children }) => {
  const { data } = useSWR<UserPayload>('/api/me', url =>
    fetch(url).then(r => r.json()),
  )

  useEffect(() => {
    data &&
      setFormFields(prev => {
        return {
          ...prev,
          senderName: data?.data.name.full,
          senderEmail: data?.data.email,
          senderPhone: data?.data.phone,
        }
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const initialValues = {
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
    city: '',
  }

  const [formFields, createChangeHandler, _, setFormFields] =
    useFormFields<OrderFormFields>(initialValues)

  return (
    <OrderFormContext.Provider
      value={{
        formFields,
        createChangeHandler,
      }}
    >
      {children}
    </OrderFormContext.Provider>
  )
}
