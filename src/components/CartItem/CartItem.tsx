import React from 'react'
import { CartItem as ICartItem } from 'types/cart'
import { css } from '@emotion/react'
import Router from 'next/router'
import { usePricingState } from './PricingContext'
import CartQuantityBox from 'components/QuantityBox/CartQuantityBox'

const rootStyle = css`
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
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
    #content-wrapper {
      display: flex;
    }
  }
`

const productInfoStyle = css`
  width: 300px;
  margin: 0 15px 0 15px;
`

const buttonWrapperStyle = css`
  margin-top: 5px;
  cursor: pointer;
  color: #888888;
`
const nameWrapperStyle = css``

const optionTextWrapperStyle = css``

const partialPriceWrapperStyle = css`
  margin: 0 100px; 0 100px;
`

interface CartItemProps {
  item: ICartItem
}

export default function CartItem({ item }: CartItemProps) {
  const { pricings, findPricingByVariantId, deletePricing } = usePricingState()
  const pricing = findPricingByVariantId(item.variant._id, pricings)

  const onRemoveClick = () => {
    deletePricing(pricing.variantId)
  }
  const optionText =
    item.variant?.types?.map(type => type.variation.value).join(' ') || ''
  return (
    <div css={rootStyle}>
      <div
        css={() => thumbnailStyle(item.product.thumbnail.url)}
        onClick={() => Router.push(`/products/${item.product._id}`)}
      />
      <div css={productInfoStyle}>
        <div css={nameWrapperStyle}> {item.product.name}</div>
        <div css={optionTextWrapperStyle}>
          {optionText && `(${optionText})`}
        </div>
        <div css={buttonWrapperStyle} onClick={onRemoveClick}>
          삭제하기
        </div>
      </div>
      <CartQuantityBox variantId={pricing?.variantId} />
      <div css={partialPriceWrapperStyle}>
        {pricing?.totalPrice.toLocaleString('ko-KR') + '원'}
      </div>
    </div>
  )
}
