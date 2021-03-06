import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import { Payload as CartPayload } from 'pages/api/cart'
import { NEXT_PUBLIC_API_URL } from 'utils/config'
import { CartItem } from 'types/cart'
import { ClayfulTotalPrice } from 'types/common'
import { CheckoutCartItem } from 'components/CartItem'
import { useOrderFormState } from './OrderFormContext'
import OrderForm from 'components/OrderForm/OrderForm'
import { useSnackbar } from 'notistack'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const totalPriceWrapperStyle = css`
  width: 200px;
  height: 80px;
  margin-left: auto;
  margin-right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-bottom: 1px solid #dddddd;
`

const shippingPriceStyle = css`
  margin-left: auto;
  margin-right: 20px;
  font-size: 17px;
`

const totalPriceStyle = css`
  margin-left: auto;
  margin-right: 20px;
`

const titleStyle = css`
  font-size: 24px;
  margin: 20px 0 0 20px;
`

const OrderScreen = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [cartItems, setCartItems] = useState<CartItem[]>(null)
  const [total, setTotal] = useState<ClayfulTotalPrice>(null)
  const { formFields } = useOrderFormState()

  const fetchCartItmes = async () => {
    const shouldAttachBody = !!(
      formFields['zipCode'] && formFields['additionalShippingAddress']
    )

    const body = {
      address: {
        shipping: {
          postcode: formFields['zipCode'],
          country: 'KR',
          city: '동탄',
          address1: formFields['additionalShippingAddress'],
        },
      },
    }

    if (!cartItems || shouldAttachBody) {
      const { data, errorCode }: CartPayload = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/cart`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...(shouldAttachBody && body) }),
        },
      ).then(res => res.json())

      if (errorCode) {
        return enqueueSnackbar(
          '서버 응답이 올바르지 않습니다. 관리자에게 문의해주세요.',
          { variant: 'error' },
        )
      }

      setCartItems(data.cart.items)
      setTotal(data.cart.total)
    }
  }

  useEffect(() => {
    fetchCartItmes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFields['shippingAddress']])

  return (
    <div css={rootStyle}>
      {cartItems &&
        cartItems.map(cartItem => {
          return <CheckoutCartItem key={cartItem._id} item={cartItem} />
        })}
      <div css={totalPriceWrapperStyle}>
        <div css={shippingPriceStyle}>
          배송비{' '}
          {total &&
            total.shipping.fee.original.raw.toLocaleString('ko-KR') + '원'}
        </div>
      </div>
      <div css={totalPriceWrapperStyle}>
        <div css={totalPriceStyle}>
          합계{' '}
          {total
            ? total.price.original.raw.toLocaleString('ko-KR') + '원'
            : '0원'}
        </div>
      </div>
      <div css={titleStyle}>주문 정보</div>
      <OrderForm />
    </div>
  )
}

export default OrderScreen
