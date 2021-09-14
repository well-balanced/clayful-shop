import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import { css, Global } from '@emotion/react'
import { UserInfoProvider } from 'context/UserInfoContext'
import { CookiesProvider } from 'react-cookie'

const globalStyle = css`
  html,
  body {
    padding: 0;
    font-family: Pretendard;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: #111111;
    text-decoration: none;
  }
`

function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  return (
    <>
      <Global styles={globalStyle} />
      <Layout>
        <CookiesProvider>
          <UserInfoProvider>
            <Component {...pageProps} />
          </UserInfoProvider>
        </CookiesProvider>
      </Layout>
    </>
  )
}

export default MyApp
