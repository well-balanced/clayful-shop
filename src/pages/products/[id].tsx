import { GetStaticPaths, GetStaticProps } from 'next'
import { clayfulGet } from 'utils/clayful'
import { ProductDetail, ProductList } from 'types/product'
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
  const { data: products } = await clayfulGet<ProductList>('/products', {
    params: {
      q: '[iwgh]',
      search: 'name.ko',
      searchMatch: 'partial',
    },
  })

  const paths = products.map(product => {
    return {
      params: { id: product._id },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params
  const res = await clayfulGet<ProductDetail>(`/products/${id}`)
  return {
    props: {
      product: attachResizingParams(res.data),
      err: res.errorCode ? res.errorCode : null,
    },
  }
}

const attachResizingParams = (product: ProductDetail) => {
  /**
   * 썸네일 이미지 URL 뒤에 리사이징 파라미터 추가
   * */
  return {
    ...product,
    thumbnail: {
      ...product.thumbnail,
      url: product.thumbnail.url + '?width=240&height=240',
    },
  }
}
