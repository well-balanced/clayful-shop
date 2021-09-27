import { css } from '@emotion/react'
import { MAIN_BANNER_IMG_URL } from 'constant'
import useSWR from 'swr'
import { FC, useState, useEffect } from 'react'
import { Payload as ProductsPayload } from 'pages/api/products'
import ProductGrid from 'components/ProductGrid'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const mainSectionStyle = css`
  background-image: url(${MAIN_BANNER_IMG_URL});
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 700px;
  opacity: 0.7;
`

interface MainScreenProps {
  products: any[]
}

const MainScreen: FC<MainScreenProps> = ({ products }) => {
  return (
    <div css={rootStyle}>
      <section css={mainSectionStyle}></section>
      <ProductGrid products={products} />
    </div>
  )
}

export default MainScreen
