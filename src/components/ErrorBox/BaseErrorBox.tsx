import React, { FC } from 'react'
import { css } from '@emotion/react'
import { errors } from './errors'
import { Modal } from '@material-ui/core'

const rootStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
`

const contentStyle = css`
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: min(11%, 200px);
`

const titleStyle = css`
  font-size: 40px;
  font-weight: bold;
  margin-top: 30px;
  line-height: 1em;
  word-break: keep-all;
`
const descriptionStyle = css`
  color: #444444;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 50px;
`

export interface BaseErrorBoxProps {
  open: boolean
  title?: string
  code?: string
}

const BaseErrorBox: FC<BaseErrorBoxProps> = props => {
  const {
    open,
    title = '에러가 발생하였습니다.',
    code,
    children,
    ...restProps
  } = props

  return (
    <Modal
      css={rootStyle}
      open={open}
      disablePortal
      disableEnforceFocus
      disableAutoFocus
    >
      <div {...restProps}>
        <div css={contentStyle}>
          <div css={titleStyle}>{title}</div>
          {code && <div css={descriptionStyle}>{errors[code]}</div>}
          {children}
        </div>
      </div>
    </Modal>
  )
}

export default BaseErrorBox
