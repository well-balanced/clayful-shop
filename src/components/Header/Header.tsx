import { css } from '@emotion/react'
import Link from 'next/link'

const rootStyle = css`
  margin: 0 auto;
  width: 1440px;
`

const toolbarStyle = css`
  padding: 0px;
  display: flex;
  justify-content: space-between;
  width: 952px;
  margin: 20px auto;
`

const titleWrapperStyle = css`
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  color: #292929;
  cursor: pointer;
  letter-spacing: -0.03em;
`

const Header = () => {
  return (
    <>
      <header css={rootStyle}>
        <nav css={toolbarStyle}>
          <Link href="/">
            <div css={titleWrapperStyle}>🎉 Clayful Shop</div>
          </Link>
        </nav>
      </header>
    </>
  )
}

export default Header
