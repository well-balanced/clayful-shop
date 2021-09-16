import { GetServerSideProps } from 'next'
import { clayfulGet } from 'utils/clayful'
import { ProductDetail } from 'types/product'
import ProductDetailScreen from 'screen/ProductDetailScreen'
import type { NextPage } from 'next'

const ProductDetailPage: NextPage<keyof GetServerSideProps> = ({
  product,
  err,
}) => {
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
