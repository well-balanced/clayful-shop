import React from 'react'
import { css } from '@emotion/react'
import { usePriceState } from 'components/ProductInfo/PriceContext'

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

interface QuantityBoxProps {
  options: any
  setItems: (arg: any) => void
}

const ProductDetailQuantityBox = ({ options, setItems }: QuantityBoxProps) => {
  const { price, total, setTotal } = usePriceState()

  const handleIncrease = () => {
    setItems(prev => {
      return prev.map(item => {
        if (item.variantId === options.variantId) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
    })
    setTotal(total + price)
  }
  const handleDecrease = () => {
    if (options.quantity > 1) {
      setItems(prev => {
        return prev.map(item => {
          if (item.variantId === options.variantId) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        })
      })
      setTotal(total - price)
    }
  }
  return (
    <div css={rootStyle}>
      <button css={buttonStyle} onClick={handleIncrease}>
        +
      </button>
      <input css={inputStyle} value={options.quantity} disabled />
      <button css={buttonStyle} onClick={handleDecrease}>
        -
      </button>
    </div>
  )
}

export default ProductDetailQuantityBox
