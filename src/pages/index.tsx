import type { NextPage } from 'next'
import MainScreen from 'screen/MainScreen'
import { GetStaticProps } from 'next'
import { ProductList, ProductDetail } from 'types/product'
import { clayfulGet } from 'utils/clayful'

interface PageProps {
  products: ProductList
}

const Home: NextPage<PageProps> = ({ products }) => {
  return <MainScreen products={products} />
}

export const getStaticProps: GetStaticProps = async () => {
  const fields = [
    '_id',
    'name',
    'summary',
    'description',
    'price',
    'discount.value',
    'discount.type',
    'shipping',
    'thumbnail',
  ]
  const res = await clayfulGet<ProductList>('/products', {
    params: {
      fields: fields.join(','),
      q: '[iwgh]',
      search: 'name.ko',
      searchMatch: 'partial',
    },
  })

  return {
    props: {
      products: res.data.map(attachResizingParams),
    },
    revalidate: 10,
  }
}

export default Home

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
