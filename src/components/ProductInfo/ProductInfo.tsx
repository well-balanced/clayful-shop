import { css } from '@emotion/react'
import { ProductDetail } from 'pages/products/types'
import { useState } from 'react'
import ProductDetailForm from './ProducDetailForm'
import { PriceProvider } from './PriceContext'

const productInfoStyle = css`
  margin: 20px 0px 20px 0px;
`

const titleStyle = css`
  color: #222222;
  font-weight: 500;
`

const priceStyle = css`
  color: #222222;
  font-weight: 400;
`

interface ProductInfoProps {
  product: ProductDetail
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [total, setTotal] = useState(0)
  const isSaleProduct = !!product.price.sale.raw
  const originalPrice = product.price.original.raw
  const salePrice = product.price.sale.raw
  const price = isSaleProduct ? salePrice : originalPrice

  return (
    <div css={productInfoStyle}>
      <h1 css={titleStyle}>{product.name}</h1>
      <h1 css={priceStyle}>{product.price.original.formatted}</h1>
      <PriceProvider total={total} price={price} setTotal={setTotal}>
        {product && <ProductDetailForm product={product} />}
      </PriceProvider>
    </div>
  )
}

export default ProductInfo
