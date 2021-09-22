import type { NextPage } from 'next'
import OrderDetailScreen from 'screen/OrderDetailScreen'
import { clayfulGet } from 'utils/clayful'
import { GetServerSideProps } from 'next'
import { Order } from 'types/order'
import { BaseErrorBox } from 'components/ErrorBox'

const OrderDetailPage: NextPage<keyof GetServerSideProps> = ({
  order,
  err,
}) => {
  if (err) return <BaseErrorBox open={true} code={err} />
  return <OrderDetailScreen order={order} />
}

export default OrderDetailPage

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params
  const { data, errorCode } = await clayfulGet<Order>(`/orders/${id}`)
  return {
    props: { order: data, err: errorCode ? errorCode : null },
  }
}
