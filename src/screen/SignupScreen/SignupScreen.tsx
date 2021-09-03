import { css } from '@emotion/react'
import SignupForm from 'components/SignupForm'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const SignupScreen = () => {
  return (
    <div css={rootStyle}>
      <SignupForm />
    </div>
  )
}

export default SignupScreen
