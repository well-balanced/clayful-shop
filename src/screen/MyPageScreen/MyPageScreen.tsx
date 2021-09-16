import { css } from '@emotion/react'
import { Payload as UserPayload } from 'pages/api/me'
import { Payload as OrderPayload } from 'pages/api/orders'
import useSWR from 'swr'
import OrderList from 'components/OrderList'
import Profile from 'components/Profile'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

/**
 * TODO: splice 메소드 삭제
 */
const MyPageScreen = () => {
  const { data: userData } = useSWR<UserPayload>('/api/me', url =>
    fetch(url).then(r => r.json()),
  )

  const { data: orderData } = useSWR<OrderPayload>('/api/orders', url =>
    fetch(url).then(r => r.json()),
  )
  console.log({ orderData })

  return (
    <div css={rootStyle}>
      {userData && <Profile customer={userData.data} />}
      {orderData && <OrderList orders={orderData.data} />}
    </div>
  )
}

export default MyPageScreen
