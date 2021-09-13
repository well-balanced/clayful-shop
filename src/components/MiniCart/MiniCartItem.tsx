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
  return (
    <div css={rootStyle}>
      {textContent}
      <QuantityBox options={options} setItems={setItems} />
    </div>
  )
}

export default MiniCartItem
