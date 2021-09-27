import { GetStaticPaths, GetStaticProps } from 'next'
import { clayfulGet } from 'utils/clayful'
import { ProductDetail } from 'types/product'
import ProductDetailScreen from 'screen/ProductDetailScreen'
import type { NextPage } from 'next'
import { BaseErrorBox } from 'components/ErrorBox'

const ProductDetailPage: NextPage<keyof GetStaticProps> = ({
  product,
  err,
}) => {
  if (err) return <BaseErrorBox open={true} code={err} />
  return <ProductDetailScreen product={product} />
}

export default ProductDetailPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params
  const { data, errorCode } = await clayfulGet<ProductDetail>(`/products/${id}`)
  return {
    props: { product: data, err: errorCode ? errorCode : null },
  }
}
