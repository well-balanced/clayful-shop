import QuantityBox from 'components/QuantityBox'
import { useEffect, useState } from 'react'
import isEqual from 'lodash/isEqual'
import { css } from '@emotion/react'

const rootStyle = css`
  margin-top: 20px;
  margin-bottom: 20px;
`

interface MiniCartItemProps {
  options: any
  items: any[]
  setItems: (arg: any) => void
}

const MiniCartItem = ({ options, items, setItems }: MiniCartItemProps) => {
  const textContent = Object.values(options).reduce((prev, curr, idx) => {
    return idx ? `${prev} ${curr}` : ''
  }, '')
  const [count, setCount] = useState(1)

  useEffect(() => {
    options.quantity = count
    const newItems = items.map(item =>
      isEqual({ ...item, quantity: 0 }, { ...options, quantity: 0 })
        ? options
        : item,
    )
    setItems(newItems)
  }, [count, items, options, setItems])

  return (
    <div css={rootStyle}>
      {textContent}
      <QuantityBox value={count} setCount={setCount} />
    </div>
  )
}

export default MiniCartItem
