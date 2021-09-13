import { css } from '@emotion/react'
import CartItem from 'components/CartItem'
import { PricingProvider, Pricing } from 'components/CartItem/PricingContext'
import { useEffect, useState } from 'react'
import { NEXT_PUBLIC_API_URL } from 'utils/config'
import { Payload as CartPayload } from 'pages/api/cart'
import Router from 'next/router'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const cartListStyle = css`
  display: grid;
  border: solid 1px #ddd;
  gap: 1rem;
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
      setPricings(
        fetched.cart.items.map(item => ({
          variantId: item.variant._id,
          quantity: item.quantity.raw,
          price: item.price.original.raw,
          totalPrice: item.price.original.raw * item.quantity.raw,
        })),
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

  return (
    <PricingProvider
      pricings={pricings}
      calculatePricings={calculatePricings}
      deletePricing={deletePricing}
      findPricingByVariantId={findPricingByVariantId}
    >
      <div css={rootStyle}>
        <button onClick={onDeleteAllClick}>delete all</button>
        <div css={cartListStyle}>
          {data?.cart?.items.map(item => (
            <CartItem item={item} key={item._id} />
          ))}
        </div>
        <div>{total.toLocaleString('ko-KR') + '원'}</div>
      </div>
    </PricingProvider>
  )
}

export default CartScreen
