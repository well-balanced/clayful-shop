import { css } from '@emotion/react'
import { Payload as UserPayload } from 'pages/api/me'
import useSWR from 'swr'
import OrderList from 'components/OrderList'
import Profile from 'components/Profile'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const MyPageScreen = () => {
  const { data: userData } = useSWR<UserPayload>('/api/me', url =>
    fetch(url).then(r => r.json()),
  )

  const { data: orderData } = useSWR<UserPayload>('/api/orders', url =>
    fetch(url).then(r => r.json()),
  )
  console.log({ orderData })

  return (
    <div css={rootStyle}>
      {userData && <Profile customer={userData.data} />}
      <OrderList />
    </div>
  )
}

export default MyPageScreen
