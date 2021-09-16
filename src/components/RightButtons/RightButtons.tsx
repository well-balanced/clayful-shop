import NextCutsomButtonLink from './ButtonLink'
import { css } from '@emotion/react'
import { useCookies } from 'react-cookie'

const rootStyle = css`
  letter-spacing: 0.2em;
  font-size: 12px;
  display: flex;
  align-items: center;
`

const RightButtons = () => {
  const [cookies] = useCookies(['isAuth'])
  return (
    <div css={rootStyle}>
      {cookies?.isAuth ? (
        <NextCutsomButtonLink href="/me">MY PAGE</NextCutsomButtonLink>
      ) : (
        <div>
          <NextCutsomButtonLink href="/login">LOGIN</NextCutsomButtonLink>
          <NextCutsomButtonLink href="/signup">SIGNUP</NextCutsomButtonLink>
        </div>
      )}
      <NextCutsomButtonLink href="/cart">CART</NextCutsomButtonLink>
    </div>
  )
}

export default RightButtons
