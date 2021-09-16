import { ProductDetail } from 'types/product'
import { css } from '@emotion/react'
import Router from 'next/router'

const contentWrapperStyle = css`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: none;
  justify-content: center;
  align-items: center;
  p {
    flex: 0 0 50%;
    margin: 0 auto;
    font-size: 12px;
    color: #25272b;
    text-align: center;
  }
`

const rootStyle = (thumbnail: any) => css`
  width: 300px;
  height: 300px;
  display: inline-block;
  background-image: url(${thumbnail.url});
  background-repeat: no-repeat;
  background-size: 300px 300px;
  &:hover {
    cursor: pointer;
    #content-wrapper {
      display: flex;
    }
  }
`

interface ProductCardProps {
  product: ProductDetail
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div
      css={() => rootStyle(product.thumbnail)}
      onClick={() => Router.push(`/products/${product._id}`)}
    >
      <div id="content-wrapper" css={contentWrapperStyle}>
        <p>
          {product.name}
          <br />
          <br />
          {product.price.original.formatted}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
