import { ProductDetailQuantityBox } from 'components/QuantityBox'
import { css } from '@emotion/react'

const rootStyle = css`
  margin-top: 20px;
  margin-bottom: 20px;
`

interface MiniCartItemProps {
  options: any
  setItems: (arg: any) => void
}

const MiniCartItem = ({ options, setItems }: MiniCartItemProps) => {
  const textContent = Object.entries(options).reduce((prev, curr) => {
    const [k, v] = curr
    const ignoreKeys = ['quantity', 'variantId']
    return ignoreKeys.includes(k) ? prev : `${prev} ${v}`
  }, '')
  return (
    <div css={rootStyle}>
      {textContent}
      <ProductDetailQuantityBox options={options} setItems={setItems} />
    </div>
  )
}

export default MiniCartItem
