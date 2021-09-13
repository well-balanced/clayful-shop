import React, { useEffect } from 'react'
import { CartItem as ICartItem } from 'types'
import { css } from '@emotion/react'
import Router from 'next/router'
import { usePricingState } from './PricingContext'
import CartQuantityBox from 'components/QuantityBox/CartQuantityBox'
import { useState } from 'react'

const rootStyle = css`
  padding: 20px;
  display: flex;
  align-items: center;
`

const thumbnailStyle = (url: string) => css`
  width: 75px;
  height: 75px;
  display: inline-block;
  background-image: url(${url}?width=240&height=240);
  background-repeat: no-repeat;
  background-size: 75px 75px;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
    #content-wrapper {
      display: flex;
    }
  }
`

const productInfoStyle = css`
  width: 400px;
`

const buttonWrapperStyle = css`
  margin-top: 10px;
  cursor: pointer;
`
const nameWrapperStyle = css``

const optionTextWrapperStyle = css``

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
      <div>{pricing?.totalPrice.toLocaleString('ko-KR') + '원'}</div>
    </div>
  )
}
