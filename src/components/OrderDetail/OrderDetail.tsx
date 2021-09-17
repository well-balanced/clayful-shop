import React from 'react'
import { Order } from 'types/order'
import { css } from '@emotion/react'
import OrderDetailField from './OrderDetailField'
import OrderDetailItem from './OrderDetailItem'
import { orderState } from 'constant'
import RefundItem from 'components/RefundItem'

const rootStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid #ccc;
  padding: 5px 50px 50px 50px;
`

const orderBaseInfoStyle = css`
  grid-column: 1/5;
  > .field {
    margin: 0 150px 0 0px;
    display: inline-block;
  }
  margin: 50px 0;
`
const titleStyle = css`
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  color: #111111;
  width: 60%;
  border-bottom: 1px solid #dddddd;
`

const ordererInfoStyle = css`
  grid-column: 1/3;
  margin: 30px 0px 30px 0;
  > .field {
    margin: 0px 0px 30px 0;
  }
`

const shippingInfoStyle = css`
  grid-column: 3/5;
  margin: 30px 0px 30px 0;
  > div {
    margin: 0px 0px 10px 0;
  }
`

const orderItemsInfoStyle = css`
  grid-column: 1/5;
  margin: 30px 0px 30px 0;
`

const refundHistoryStyle = css`
  grid-column: 1/5;
  margin: 30px 0px 30px 0;
`

const orderTotalInfoStyle = css`
  grid-column: 1/5;
  margin: 30px 0px 30px 0;
  > .field {
    margin: 0px 150px 0px 0;
    display: inline-block;
  }
  font-size: 18px;
`

interface OrderDetailProps {
  order: Order
}

export default function OrderDetail({ order }: OrderDetailProps) {
  return (
    <div css={rootStyle}>
      <div css={orderBaseInfoStyle}>
        <div css={titleStyle}>주문 정보</div>
        <OrderDetailField label={'주문 번호'} value={order._id} />
        <OrderDetailField
          label={'주문 상태'}
          value={orderState[order.status]}
        />
        <OrderDetailField
          label={'주문 일시'}
          value={order.createdAt.formatted}
        />
      </div>
      <div css={ordererInfoStyle}>
        <div css={titleStyle}>주문자 정보</div>
        <OrderDetailField
          label={'주문자 명'}
          value={order.customer.name.full}
        />
        <OrderDetailField label={'이메일'} value={order.customer.email} />
        <OrderDetailField label={'휴대폰 번호'} value={order.customer.phone} />
      </div>
      <div css={shippingInfoStyle}>
        <div css={titleStyle}>배송 정보</div>
        <OrderDetailField
          label={'국가'}
          value={order.address.shipping.country.name}
        />
        <OrderDetailField label={'도시'} value={order.address.shipping.city} />
        <OrderDetailField
          label={'상세주소'}
          value={order.address.shipping.address1}
        />
        <OrderDetailField
          label={'우편번호'}
          value={order.address.shipping.postcode}
        />
      </div>
      <div css={orderItemsInfoStyle}>
        <div css={titleStyle}>주문 상품 정보</div>
        {order.items.map(item => {
          return <OrderDetailItem key={item._id} item={item} />
        })}
      </div>

      <div css={refundHistoryStyle}>
        <div css={titleStyle}>환불 요청 내역</div>
        {order.refunds.map(refund => (
          <RefundItem key={refund._id} refund={refund} />
        ))}
      </div>

      <div css={orderTotalInfoStyle}>
        <div css={titleStyle}>주문 총액 정보</div>
        <OrderDetailField
          label={'주문 총액'}
          value={order.total.items.price.original.formatted}
        />
        <OrderDetailField
          label={'배송비'}
          value={order.total.shipping.fee.original.formatted}
        />
        <OrderDetailField
          label={'총액'}
          value={order.total.price.original.formatted}
        />
      </div>
    </div>
  )
}
