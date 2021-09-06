import { Product } from 'pages/api/products'

interface ProductGridProps {
  products: Product[]
  pageSize?: number
  onLoadMore: () => void
}

const ProductGrid = ({
  products,
  pageSize = 3,
  onLoadMore,
}: ProductGridProps) => {
  return (
    <div>
      <button onClick={() => onLoadMore()}>더 불러오기</button>
      {products.map(product => {
        return product.name
      })}
    </div>
  )
}

export default ProductGrid
