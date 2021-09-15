import React from 'react'
import AddressFields from './AddressFields'
import ReceiverFields from './ReceiverFields'
import RequestField from './RequestField'
import SenderFields from './SenderFields'
import PaymentFields from './PaymentFields'

export default function OrderForm() {
  return (
    <>
      <SenderFields />
      <ReceiverFields />
      <AddressFields />
      <PaymentFields />
      <RequestField />
    </>
  )
}
