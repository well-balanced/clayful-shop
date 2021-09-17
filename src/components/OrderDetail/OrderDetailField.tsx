import React from 'react'
import { css } from '@emotion/react'

const rootStyle = css``

const labelWrapperStyle = css`
  color: #888888;
  width: 100px;
  margin-bottom: 5px;
`

const contentStyle = css`
  font-weight: 500;
  color: #333333;
`

interface OrderDetailFieldProps {
  label: string
  value: string
}

export default function OrderDetailField({
  label,
  value,
}: OrderDetailFieldProps) {
  return (
    <div className="field" css={rootStyle}>
      <div css={labelWrapperStyle}>
        <label>{label}</label>
      </div>
      <span css={contentStyle}>{value}</span>
    </div>
  )
}
