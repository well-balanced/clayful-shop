import { css } from '@emotion/react'
import { ProductDetail } from 'types'
import ProductInfo from 'components/ProductInfo'

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 100px;
  font-size: 13px;
  font-family: Pretendard;
`

const catalogImageStyle = defaultCatalogImgUrl => css`
  width: 500px;
  height: 500px;
  background-image: url(${defaultCatalogImgUrl});
  background-repeat: no-repeat;
  background-size: 500px 500px;
  margin: 30px 0px 30px 0px;
`

interface ProductDetailScreenProps {
  product: ProductDetail
}

const ProductDetailScreen = ({ product }: ProductDetailScreenProps) => {
  const [defaultCatalog] = product.catalogs
  return (
    <div css={rootStyle}>
      <div css={() => catalogImageStyle(defaultCatalog.image.url)} />
      <ProductInfo product={product} />
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </div>
  )
}

export default ProductDetailScreen
