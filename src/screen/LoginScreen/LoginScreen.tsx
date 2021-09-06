import { css } from '@emotion/react'
import LoginForm from 'components/LoginForm'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const LoginScreen = () => {
  return (
    <div css={rootStyle}>
      <LoginForm />
    </div>
  )
}

export default LoginScreen
