import React from 'react'
import { Order } from 'types/order'
import { css } from '@emotion/react'
import Router from 'next/router'

const rootStyle = css`
  > * {
    margin: 0 10px 0 10px;
  }
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  &:hover {
    cursor: pointer;
  }
  color: #666666;
`

const thumbnailStyle = (url: string) => css`
  width: 75px;
  height: 75px;
  display: inline-block;
  background-image: url(${url}?width=240&height=240);
  background-repeat: no-repeat;
  background-size: 75px 75px;
  &:hover {
    cursor: pointer;
  }
`

interface OrderItemProps {
  order: Order
}

enum OrderState {
  cancelled = '취소',
  'over-paid' = '초과 결제',
  'over-refunded' = '초과 환불',
  paid = '결제 완료',
  'partially-refunded' = '부분 취소',
  placed = '주문 완료',
  refunded = '환불 완료',
  'under-paid' = '결제 금액 부족',
  'under-refunded' = '환불 금액 부족',
}

export default function OrderItem({ order }: OrderItemProps) {
  const onItemClick = () => {
    Router.push(`/orders/${order._id}`)
  }
  return (
    <div css={rootStyle} onClick={onItemClick}>
      <div css={thumbnailStyle(order.items[0].product.thumbnail.url)} />
      <div style={{ width: '150px' }}>{order._id}</div>
      <div style={{ width: '100px' }}> {OrderState[order.status]}</div>
      <div style={{ width: '200px' }}>{order.items[0].product.name}</div>
      <div style={{ width: '100px' }}> {order.total.amount.formatted}</div>
      <div style={{ width: '200px' }}> {order.createdAt.formatted}</div>
    </div>
  )
}
