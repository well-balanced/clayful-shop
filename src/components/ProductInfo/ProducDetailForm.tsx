import useFormFields from 'hooks/useFormFields'
import { OptionDetail } from 'pages/products/types'
import SelectFormField from 'components/SelectFormField'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { MiniCart } from 'components/MiniCart'
import isEqual from 'lodash/isEqual'
import { usePriceState } from './PriceContext'

interface ProductDetailFormProps {
  options: OptionDetail[]
}

const ProductDetailForm = ({ options = [] }: ProductDetailFormProps) => {
  const [miniCartItems, setMiniCartItems] = useState([])
  const [optionFields, createOptionHanlder, resetOptionFields] = useFormFields<
    Object,
    HTMLSelectElement
  >(
    options.reduce(
      (prev, curr) => {
        return { ...prev, [curr._id]: null }
      },
      { quantity: 1 },
    ),
  )
  const { price, setTotal } = usePriceState()

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
        const newItems = [...miniCartItems, optionFields]
        setMiniCartItems(newItems)
        const quantities = newItems.reduce<number>(
          (prev, curr) => prev + curr.quantity,
          0,
        )
        setTotal(price * quantities)
      }
      // @ts-ignore
      resetOptionFields()
    }
  }, [miniCartItems, shouldAddItem])
  return (
    <div>
      {options.map(option => (
        <SelectFormField
          shouldAddItem={shouldAddItem}
          option={option}
          // @ts-ignore
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
    </div>
  )
}

export default ProductDetailForm
