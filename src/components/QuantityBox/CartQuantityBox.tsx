import React from 'react'
import { css } from '@emotion/react'
import { usePricingState } from 'components/CartItem/PricingContext'

const rootStyle = css`
  margin-top: 10px;
`

const buttonStyle = css`
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border: solid 1px #ddd;
  text-decoration: none;
  color: #888888;
  &:hover {
    cursor: pointer;
  }
`

const inputStyle = css`
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border-top: solid 1px #ddd;
  border-bottom: solid 1px #ddd;
  border-right: none;
  border-left: none;
  text-align: center;
  color: #333333;
`

interface CartQuantityBoxProps {
  variantId: string
}

const CartQuantityBox = ({ variantId }: CartQuantityBoxProps) => {
  const { pricings, calculatePricings, findPricingByVariantId } =
    usePricingState()
  const pricing = findPricingByVariantId(variantId, pricings)

  const handleIncrease = () => {
    pricing.quantity += 1
    pricing.totalPrice = pricing.price * pricing.quantity
    calculatePricings(pricing)
  }

  const handleDecrease = () => {
    if (pricing.quantity > 1) {
      pricing.quantity -= 1
      pricing.totalPrice = pricing.price * pricing.quantity
      calculatePricings(pricing)
    }
  }
  return (
    <div css={rootStyle}>
      <button css={buttonStyle} onClick={handleDecrease}>
        -
      </button>
      <input css={inputStyle} value={pricing?.quantity} disabled />
      <button css={buttonStyle} onClick={handleIncrease}>
        +
      </button>
    </div>
  )
}

export default CartQuantityBox
