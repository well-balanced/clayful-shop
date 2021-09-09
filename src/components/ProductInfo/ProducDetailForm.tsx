import useFormFields from 'hooks/useFormFields'
import SelectFormField from 'components/SelectFormField'
import { useEffect, useState } from 'react'
import { MiniCart } from 'components/MiniCart'
import isEqual from 'lodash/isEqual'
import { usePriceState } from './PriceContext'
import { css } from '@emotion/react'
import { ProductDetail } from 'types'
import { BaseErrorBox } from 'components/ErrorBox'

const totalPriceWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  width: 200px;
`

interface ProductDetailFormProps {
  product: ProductDetail
}

const ProductDetailForm = ({ product }: ProductDetailFormProps) => {
  const [errorInfo, setErrorInfo] = useState({ open: false, errorCode: null })
  const [miniCartItems, setMiniCartItems] = useState([])
  const [optionFields, createOptionHanlder, resetOptionFields] = useFormFields<
    Object,
    HTMLSelectElement
  >(
    product?.options.reduce(
      (prev, curr) => {
        return { ...prev, [curr._id]: null }
      },
      { quantity: 1 },
    ),
  )
  const { price, total, setTotal } = usePriceState()

  const defaultValue = '옵션을 선택해주세요'

  /**
   * 모든 필드를 입력하면 미니카트에 항목이 담긴다.
   */
  const shouldAddItem = Object.values(optionFields).every(
    val => ![null, defaultValue].includes(val),
  )
  useEffect(() => {
    if (shouldAddItem) {
      const isSameItem =
        miniCartItems.length &&
        miniCartItems.some(item =>
          /* 만약 quantity까지 체크하면 같은 상품이 들어갈 수 있음 */
          isEqual({ ...item, quantity: 0 }, { ...optionFields, quantity: 0 }),
        )

      if (!isSameItem) {
        const variantId = findVariantId(optionFields, product)
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
  }, [
    miniCartItems,
    optionFields,
    price,
    product,
    resetOptionFields,
    setTotal,
    shouldAddItem,
  ])

  const handleOrderButtonClick = async () => {
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
    results.some(r => {
      if (r.errorCode) {
        setErrorInfo({ open: true, errorCode: r.errorCode })
        setTimeout(() => setErrorInfo({ open: false, errorCode: null }), 1000)
        return true
      }
      return false
    })
  }

  // const handleCartButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {}
  return (
    <div>
      {product?.options.map(option => (
        <SelectFormField
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
      <button onClick={handleOrderButtonClick}>주문하기</button>
      <button>장바구니</button>
      <BaseErrorBox open={errorInfo.open} code={errorInfo.errorCode} />
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