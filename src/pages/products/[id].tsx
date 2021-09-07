import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

function ProductDetailPage({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <></>
}

export default ProductDetailPage

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params
  return {
    props: { product: null },
  }
}
