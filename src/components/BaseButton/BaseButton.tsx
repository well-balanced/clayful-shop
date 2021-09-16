import React, { FC } from 'react'
import { css } from '@emotion/react'

interface BaseButtonProps {
  onClick?: () => void
}

const rootStyle = css`
  margin: 1em;
`

const buttonStyle = css`
  margin-top: 30px;
  margin-left: auto;
  margin-right: 0px;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  align-items: center;
  border: none;
  background: #333333;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
`
const BaseButton: FC<BaseButtonProps> = ({ children, onClick }) => {
  return (
    <div css={rootStyle}>
      <button css={buttonStyle} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

export default BaseButton
