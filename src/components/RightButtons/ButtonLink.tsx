import Link from 'next/link'
import { css } from '@emotion/react'
import { FC } from 'react'

interface ButtonLinkProps {
  href: string
}

const rootStyle = css`
  margin: 0px 20px 0px 20px;
  display: inline-block;
`

const NextCutsomButtonLink: FC<ButtonLinkProps> = ({ href, children }) => {
  return (
    <div css={rootStyle}>
      <Link href={href}>{children}</Link>
    </div>
  )
}

export default NextCutsomButtonLink
