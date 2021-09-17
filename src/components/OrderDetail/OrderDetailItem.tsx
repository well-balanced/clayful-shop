import React from 'react'
import { css } from '@emotion/react'
import Router from 'next/router'
import { OrderItem as IOrderItem } from 'types/order'

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
  color: #444444;
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
  item: IOrderItem
}

export default function OrderItem({ item }: OrderItemProps) {
  const onItemClick = () => {
    Router.push(`/orders/${item._id}`)
  }
  return (
    <div css={rootStyle} onClick={onItemClick}>
      <div css={thumbnailStyle(item.product.thumbnail.url)} />
      <div style={{ width: '200px' }}>{item.product.name}</div>
      <div style={{ width: '100px' }}>
        {item.variant.types.map(type => type.variation.value).join(' ')}
      </div>
      <div style={{ width: '200px' }}> {item.quantity.formatted}</div>
      <div style={{ width: '100px' }}>
        {item.total.price.original.formatted}
      </div>
    </div>
  )
}
