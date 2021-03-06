import useFormFields from 'hooks/useFormFields'
import ProductDetailSelect from 'components/ProductDetailSelect'
import { useEffect, useState } from 'react'
import { MiniCart } from 'components/MiniCart'
import isEqual from 'lodash/isEqual'
import { usePriceState } from './PriceContext'
import { css } from '@emotion/react'
import { ProductDetail } from 'types/product'
import { omit } from 'utils'
import BaseButton from 'components/BaseButton'
import Router from 'next/router'
import { useSnackbar } from 'notistack'
import { useCookies } from 'react-cookie'

const totalPriceWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  width: 200px;
`

const buttonWrapperStyle = css`
  display: flex;
`

interface ProductDetailFormProps {
  product: ProductDetail
}

const ProductDetailForm = ({ product }: ProductDetailFormProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const [cookies] = useCookies(['isAuth'])
  const [miniCartItems, setMiniCartItems] = useState([])
  const defaultValue = '옵션을 선택해주세요'
  const defaultQuantity = 1
  const [optionFields, createOptionHanlder, resetOptionFields] = useFormFields<
    Object,
    HTMLSelectElement
  >(
    product?.options.reduce(
      (prev, curr) => {
        return { ...prev, [curr._id]: null }
      },
      { quantity: defaultQuantity },
    ),
  )
  const { price, total, setTotal } = usePriceState()

  /**
   * 모든 필드를 입력하면 미니카트에 항목이 담긴다.
   */
  const values = Object.values(omit(optionFields, 'quantity'))
  const shouldAddItem = !product?.options.length
    ? true
    : values.length &&
      // @ts-ignore
      values.every(val => ![null, undefined, defaultValue].includes(val))

  useEffect(() => {
    if (shouldAddItem) {
      const variantId = findVariantId(optionFields, product)
      const hasSameItem = miniCartItems.some(item => {
        /* 만약 quantity까지 체크하면 같은 상품이 들어갈 수 있음 */
        return isEqual(
          { ...item, quantity: 0 },
          { ...optionFields, variantId, quantity: 0 },
        )
      })

      if (!hasSameItem) {
        const newItems = [...miniCartItems, { ...optionFields, variantId }]
        setMiniCartItems(newItems)
        const totalQuantity = newItems.reduce<number>(
          (prev, curr) => prev + curr.quantity,
          0,
        )
        setTotal(price * totalQuantity)
      }
      resetOptionFields()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAddItem, miniCartItems, price, product])

  const handleCartButtonClick = async () => {
    if (!cookies?.isAuth) {
      return Router.push('/login')
    }

    const promises = miniCartItems.map(item =>
      fetch('/api/cart/items', {
        method: 'POST',
        body: JSON.stringify({
          product: product._id,
          variant: item.variantId,
          quantity: item.quantity,
          shippingMethod: product.shipping.methods[0]._id,
        }),
      }).then(r => r.json()),
    )

    const results = await Promise.all(promises)
    const hasErrors = results.some(r => (r.errorCode ? true : false))
    if (hasErrors) {
      return enqueueSnackbar(
        '알 수 없는 에러가 발생했습니다. 관리자에게 문의해주세요.',
        { variant: 'error' },
      )
    }

    Router.push('/cart')
  }

  return (
    <div>
      {product?.options.map(option => (
        <ProductDetailSelect
          shouldAddItem={shouldAddItem}
          option={option}
          onChange={createOptionHanlder}
          defaultValue={defaultValue}
          key={option._id}
        />
      ))}
      <div>
        {!!miniCartItems.length && (
          <MiniCart items={miniCartItems} setItems={setMiniCartItems} />
        )}
      </div>
      <div css={totalPriceWrapperStyle}>
        <div style={{ fontSize: '1rem' }}>총 상품 금액</div>
        <div style={{ fontSize: '1rem' }}>
          {' '}
          {total.toLocaleString('ko-KR') + '원'}
        </div>
      </div>
      <div css={buttonWrapperStyle}>
        <BaseButton onClick={handleCartButtonClick}>장바구니</BaseButton>
      </div>
    </div>
  )
}

export default ProductDetailForm

function findVariantId(optionFields = {}, product: ProductDetail) {
  /**
   * 사용자가 선택한 옵션에 해당하는 variant id를 가져온다.
   */
  const [, ...values] = Object.values<string>(optionFields)
  const variant = product.variants.find(variant =>
    values.every(val =>
      variant.types.find(type => type.variation.value === val),
    ),
  )
  return variant && variant._id
}
