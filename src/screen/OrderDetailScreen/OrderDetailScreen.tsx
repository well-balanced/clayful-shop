import React from 'react'
import OrderDetail from 'components/OrderDetail'
import { css } from '@emotion/react'
import BaseButton from 'components/BaseButton'
import { Order } from 'types/order'
import { useSnackbar } from 'notistack'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const titleStyle = css`
  font-size: 30px;
  margin: 30px;
  text-align: center;
`

interface OrderDetailScreenProps {
  order: Order
}

export default function OrderDetailScreen({ order }: OrderDetailScreenProps) {
  const { enqueueSnackbar } = useSnackbar()
  const onRefundButtonClick = async () => {
    const body = JSON.stringify({
      items: order.items.map(item => ({
        item: item._id,
        quantity: item.quantity.raw,
      })),
      shipments: order.shipments.map(shipment => shipment._id),
    })
    const data = await fetch(`/api/orders/${order._id}/refunds`, {
      method: 'POST',
      body,
    })

    data?.status === 200
      ? enqueueSnackbar('성공적으로 처리되었습니다.', { variant: 'success' })
      : enqueueSnackbar('환불 요청에 실패하였습니다.', { variant: 'error' })
  }

  return (
    <div css={rootStyle}>
      <div css={titleStyle}>주문 상세</div>
      <OrderDetail order={order} />
      <BaseButton onClick={onRefundButtonClick}>환불 요청</BaseButton>
    </div>
  )
}
