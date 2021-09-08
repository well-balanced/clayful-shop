import { GetServerSideProps } from 'next'
import clayfulGet from 'utils/clayfulGet'
import { ProductDetail } from './types'
import ProductDetailScreen from 'screen/ProductDetailScreen'

interface ProductDetailPageProps {
  product: ProductDetail
  err: string | null
}

function ProductDetailPage({ product, err }: ProductDetailPageProps) {
  if (err) return <div>{err}</div>
  return <ProductDetailScreen product={product} />
}

export default ProductDetailPage

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params
  const { data, errorCode } = await clayfulGet<ProductDetail>(`/products/${id}`)
  return {
    props: { product: data, err: errorCode ? errorCode : null },
  }
}
