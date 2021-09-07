import NextCutsomButtonLink from './ButtonLink'
import { css } from '@emotion/react'

const rootStyle = css`
  letter-spacing: 0.2em;
  font-size: 12px;
  display: flex;
  align-items: center;
`

const RightButtons = () => {
  return (
    <div css={rootStyle}>
      <NextCutsomButtonLink href="/login">LOGIN</NextCutsomButtonLink>
      <NextCutsomButtonLink href="/signup">SIGNUP</NextCutsomButtonLink>
      <NextCutsomButtonLink href="/cart">CART</NextCutsomButtonLink>
    </div>
  )
}

export default RightButtons
