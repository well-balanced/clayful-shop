import { css } from '@emotion/react'
import { Payload as UserPayload } from 'pages/api/me'
import useSWR from 'swr'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const MyPageScreen = () => {
  const { data } = useSWR<UserPayload>('/api/me', url =>
    fetch(url).then(r => r.json()),
  )
  return (
    <div css={rootStyle}>
      이메일 {data?.data?.email}
      이름 {data?.data?.name?.full}
      휴대폰 번호 {data?.data?.phone}
    </div>
  )
}

export default MyPageScreen
