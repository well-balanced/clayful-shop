import { css } from '@emotion/react'
import Link from 'next/link'
import RightButtons from 'components/RightButtons'
import { LOGO_IMG_URL } from 'constant'

const rootStyle = css`
  margin: 0 auto;
  width: 1440px;
`

const toolbarStyle = css`
  padding: 0px;
  display: flex;
  justify-content: space-between;
  width: 952px;
  height: 30px;
  margin: 30px auto;
`

const titleWrapperStyle = css`
  cursor: pointer;
  width: 150px;
  background-image: url(${LOGO_IMG_URL});
  background-repeat: no-repeat;
  background-size: 150px 25px;
`

const Header = () => {
  return (
    <>
      <header css={rootStyle}>
        <nav css={toolbarStyle}>
          <Link href="/" passHref>
            <div css={titleWrapperStyle} />
          </Link>
          <RightButtons />
        </nav>
      </header>
    </>
  )
}

export default Header
