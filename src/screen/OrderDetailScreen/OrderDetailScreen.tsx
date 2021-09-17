import React from 'react'
import OrderDetail from 'components/OrderDetail'
import { css } from '@emotion/react'
import BaseButton from 'components/BaseButton'
import { Order } from 'types/order'

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
  const onRefundButtonClick = () => {
    /**
     * TODO: use refund API
     */
  }
  return (
    <div css={rootStyle}>
      <div css={titleStyle}>주문내역서</div>
      {JSON.stringify(order)}
      <OrderDetail order={order} />
      <BaseButton onClick={onRefundButtonClick}>환불 요청</BaseButton>
    </div>
  )
}
