import { css } from '@emotion/react'
import { MAIN_BANNER_IMG_URL } from 'constants/images'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
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

const MainScreen = () => {
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState([])

  const { data } = useSWR<ProductsPayload>(`/api/products?page=${page}`, url =>
    fetch(url).then(r => r.json()),
  )

  useEffect(() => {
    data && setProducts([...products, ...data.data])
  }, [data])

  const fetchProducts = (e: any) => {
    e.previousPosition && setPage(page + 1)
  }

  return (
    <div css={rootStyle}>
      <section css={mainSectionStyle}></section>
      <ProductGrid products={products} onLoadMore={fetchProducts} />
    </div>
  )
}

export default MainScreen
