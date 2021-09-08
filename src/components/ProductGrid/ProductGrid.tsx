import { Product } from 'pages/api/products'
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
  products: Product[]
  pageSize?: number
  onLoadMore: (e: any) => void
}

const ProductGrid = ({ products, onLoadMore }: ProductGridProps) => {
  return (
    <div>
      <div></div>
      <InfiniteScroll loadMore={onLoadMore} hasMore={true}>
        <div css={gridContainerStyle}>
          {products.map(product => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default ProductGrid
