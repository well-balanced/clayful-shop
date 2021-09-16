import { css } from '@emotion/react'
import SignupForm from 'components/SignupForm'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const titleStyle = css`
  font-size: 30px;
  margin: 50px;
  text-align: center;
`

const SignupScreen = () => {
  return (
    <div css={rootStyle}>
      <div css={titleStyle}>회원가입</div>
      <SignupForm />
    </div>
  )
}

export default SignupScreen
