import { css } from '@emotion/react'
import LoginForm from 'components/LoginForm'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const titleStyle = css`
  font-size: 30px;
  margin: 50px;
  text-align: center;
`

const LoginScreen = () => {
  return (
    <div css={rootStyle}>
      <div css={titleStyle}>로그인</div>
      <LoginForm />
    </div>
  )
}

export default LoginScreen
