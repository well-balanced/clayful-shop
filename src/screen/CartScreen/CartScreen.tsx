import { css } from '@emotion/react'
import { CartItem } from 'components/CartItem'
import { usePricingState } from 'components/CartItem/PricingContext'
import { useEffect, useState } from 'react'
import { NEXT_PUBLIC_API_URL } from 'utils/config'
import { Payload as CartPayload } from 'pages/api/cart'
import Router from 'next/router'
import BaseButton from 'components/BaseButton'
import { useSnackbar } from 'notistack'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`
const titleStyle = css`
  font-size: 24px;
  margin: 20px 0 0 20px;
`

const cartListStyle = css`
  display: grid;
  gap: 1rem;
`

const deleteAllWrapperStyle = css`
  cursor: pointer;
  color: #888888;
  width: 150px;
  height: 50px;
  margin-left: auto;
  margin-right: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
const totalPriceStyle = css`
  max-width: 50%;
  margin: 0 20px 0 20px;
`

const CartScreen = () => {
  const [data, setData] = useState(null)
  const { enqueueSnackbar } = useSnackbar()
  const { pricings, total, setTotal, setPricings } = usePricingState()
  const fetchCartItmes = async () => {
    if (data) return

    const { data: fetched, errorCode }: CartPayload = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/cart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then(res => res.json())

    if (errorCode) {
      return enqueueSnackbar(
        '서버 응답이 올바르지 않습니다. 관리자에게 문의해주세요.',
        {
          variant: 'error',
        },
      )
    }

    const newPricings = fetched.cart.items.map(item => ({
      productId: item.product._id,
      variantId: item.variant._id,
      quantity: item.quantity.raw,
      price: item.price.original.raw / item.quantity.raw,
      totalPrice: item.price.original.raw,
      shippingMethodId: item.shippingMethod._id,
    }))
    setPricings(newPricings)
    setData(fetched)
    setTotal(
      newPricings.reduce((prev, curr) => prev + curr.price * curr.quantity, 0),
    )
  }

  useEffect(() => {
    fetchCartItmes()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onDeleteAllClick = async () => {
    await fetch(`${NEXT_PUBLIC_API_URL}/api/cart/items`, {
      method: 'DELETE',
    })
    setPricings([])
    setTotal(0)
  }

  const onOrderButtonClick = async () => {
    await fetch(`/api/cart/items`, {
      method: 'DELETE',
    })

    const promises = pricings.map(async item =>
      fetch('/api/cart/items', {
        method: 'POST',
        body: JSON.stringify({
          product: item.productId,
          variant: item.variantId,
          quantity: item.quantity,
          shippingMethod: item.shippingMethodId,
        }),
      }),
    )

    await Promise.all(promises)
    Router.push('/orders')
  }

  return (
    <div css={rootStyle}>
      <div css={titleStyle}>장바구니</div>
      <div css={deleteAllWrapperStyle} onClick={onDeleteAllClick}>
        장바구니 비우기
      </div>
      <div css={cartListStyle}>
        {data?.cart?.items
          .filter(item =>
            pricings.some(pricing => item.variant._id === pricing.variantId),
          )
          .map(item => {
            return <CartItem item={item} key={item._id} />
          })}
      </div>
      {total > 0 && (
        <div>
          <div css={totalPriceWrapperStyle}>
            <div css={totalPriceStyle}>합계</div>
            <div>{total.toLocaleString('ko-KR') + '원'}</div>
          </div>
          <BaseButton onClick={onOrderButtonClick}>주문하기</BaseButton>
        </div>
      )}
    </div>
  )
}

export default CartScreen
