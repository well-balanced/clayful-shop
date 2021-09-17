import React from 'react'
import { Refund } from 'types/order'
import OrderDetailField from 'components/OrderDetail/OrderDetailField'
import { css } from '@emotion/react'

const rootStyle = css`
  > .field {
    display: inline-block;
    width: 150px;
    margin: 0 20px 0 0px;
  }
`

interface RefundItemProps {
  refund: Refund
}

export default function RefundItem({ refund }: RefundItemProps) {
  const productNames = `${refund.items[0].item.product.name} ${
    refund.items.length > 1 ? `외 ${refund.items.length - 1}건` : ''
  }`
  return (
    <div css={rootStyle}>
      <OrderDetailField label={'주문 번호'} value={refund._id} />
      <OrderDetailField label={'상품'} value={productNames} />
      <OrderDetailField label={'환불 상태'} value={refund.status} />
      <OrderDetailField
        label={'환불 예정액'}
        value={refund.total.price.withTax.formatted}
      />
      <OrderDetailField label={'취소 일시'} value={refund.createdAt.ago} />
    </div>
  )
}
