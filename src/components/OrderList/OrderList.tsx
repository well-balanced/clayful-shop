import React from 'react'
import { Orders } from 'types/order'
import OrderItem from './OrderItem'
import { css } from '@emotion/react'

interface OrderListProps {
  orders: Orders
}

const rootStyle = css`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 150px;
`

const labelStyle = css`
  > * {
    margin: 0 10px 0 10px;
  }
  padding: 20px;
  display: flex;
  border-bottom: 1px solid #dddddd;
  &:hover {
    cursor: pointer;
  }
`

const titleStyle = css`
  font-size: 30px;
  margin: 30px;
  text-align: center;
`

const orderListStyle = css`
  display: grid;
  gap: 1rem;
`

export default function OrderList({ orders }: OrderListProps) {
  return (
    <div css={rootStyle}>
      <div id="orderList" css={titleStyle}>
        주문리스트
      </div>
      <div css={orderListStyle}>
        <div css={labelStyle}>
          <div style={{ width: '75px' }}>상품 이미지</div>
          <div style={{ width: '150px' }}>주문 번호</div>
          <div style={{ width: '100px' }}> 주문 상태</div>
          <div style={{ width: '200px' }}>상품명</div>
          <div style={{ width: '100px' }}>금액</div>
          <div style={{ width: '200px' }}> 주문 일시</div>
        </div>
        {orders.map(order => (
          <OrderItem key={order._id} order={order} />
        ))}
      </div>
    </div>
  )
}
