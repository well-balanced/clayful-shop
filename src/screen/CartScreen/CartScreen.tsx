import { css } from '@emotion/react'
import CartItem from 'components/CartItem'
import { PricingProvider, Pricing } from 'components/CartItem/PricingContext'
import { useEffect, useState } from 'react'
import { NEXT_PUBLIC_API_URL } from 'utils/config'
import { Payload as CartPayload } from 'pages/api/cart'
import Router from 'next/router'
import BaseButton from 'components/BaseButton'

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
  const [errorCode, setErrorCode] = useState(null)
  // @ts-ignore
  const [pricings, setPricings] = useState<Pricing[]>([])
  const [total, setTotal] = useState(0)

  const calculatePricings = (pricing: Pricing) => {
    const newPricings = pricings.map(item =>
      item.variantId === pricing.variantId ? pricing : item,
    )
    const accumulated = newPricings.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0,
    )
    setPricings(newPricings)
    setTotal(accumulated)
  }

  const deletePricing = (variantId: string) => {
    const newPricings = pricings.filter(
      pricing => pricing.variantId !== variantId,
    )
    setPricings(newPricings)
  }

  const findPricingByVariantId = (variantId: string, pricings: Pricing[]) => {
    const pricing = pricings.find(pricing => pricing.variantId === variantId)
    return pricing
  }

  const fetchCartItmes = async () => {
    if (data || errorCode) return
    const { data: fetched, errorCode: err }: CartPayload = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/cart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then(res => res.json())

    if (fetched) {
      setData(fetched)
      const newPricings = fetched.cart.items.map(item => ({
        variantId: item.variant._id,
        quantity: item.quantity.raw,
        price: item.price.original.raw,
        totalPrice: item.price.original.raw * item.quantity.raw,
      }))
      setPricings(newPricings)
      setTotal(
        newPricings.reduce(
          (prev, curr) => prev + curr.price * curr.quantity,
          0,
        ),
      )
    }
    setErrorCode(err)
  }

  useEffect(() => {
    fetchCartItmes()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, errorCode])

  useEffect(() => {}, [pricings])

  const onDeleteAllClick = async () => {
    await fetch(`${NEXT_PUBLIC_API_URL}/api/cart/items`, {
      method: 'DELETE',
    }).then(r => r.json())
    Router.push('/cart')
  }

  const onOrderButtonClick = () => {
    console.log(1)
  }

  return (
    <PricingProvider
      pricings={pricings}
      calculatePricings={calculatePricings}
      deletePricing={deletePricing}
      findPricingByVariantId={findPricingByVariantId}
    >
      <div css={rootStyle}>
        <div css={titleStyle}>장바구니</div>
        <div css={deleteAllWrapperStyle} onClick={onDeleteAllClick}>
          장바구니 비우기
        </div>
        <div css={cartListStyle}>
          {data?.cart?.items.map(item => (
            <CartItem item={item} key={item._id} />
          ))}
        </div>
        <div css={totalPriceWrapperStyle}>
          <div css={totalPriceStyle}>합계</div>
          <div>{total > 0 && total.toLocaleString('ko-KR') + '원'}</div>
        </div>
        <BaseButton onClick={onOrderButtonClick}>주문하기</BaseButton>
      </div>
    </PricingProvider>
  )
}

export default CartScreen
