import { ProductList } from 'types/product'
import ProductCard from 'components/ProductCard'
import { css } from '@emotion/react'
import InfiniteScroll from 'components/InfiniteScroll'

const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 25px;
  column-gap: 25px;
`

interface ProductGridProps {
  products: ProductList
  pageSize?: number
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div>
      <div css={gridContainerStyle}>
        {products.map(product => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
