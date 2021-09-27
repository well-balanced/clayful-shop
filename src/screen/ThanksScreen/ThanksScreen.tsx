import React from 'react'
import { css } from '@emotion/react'
import BaseButton from 'components/BaseButton'
import Router from 'next/router'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const titleStyle = css`
  font-size: 30px;
  margin: 50px;
  text-align: center;
`
const buttonWrapperStyle = css`
  width: 100px;
  margin: 0 auto;
`

export default function ThanksScreen() {
  const onButtonClick = () => {
    Router.push('/me#orderList')
  }

  return (
    <div css={rootStyle}>
      <div css={titleStyle}>주문이 정상적으로 완료되었습니다.</div>
      <div css={buttonWrapperStyle}>
        <BaseButton onClick={onButtonClick}>주문한 상품들 보러가기</BaseButton>
      </div>
    </div>
  )
}
