import { OptionDetail } from 'types'
import { css } from '@emotion/react'
import { useEffect, useRef } from 'react'

const rootStyle = css`
  margin: 30px 0px 30px 0px;
`

const labelStyle = css`
  display: block;
  margin: 10px 0px 10px 0px;
  font-size: 16px;
  color: #555555;
`

const selectBoxStyle = css`
  width: 200px;
  padding: 0.8em 0.5em;
  border: 1px solid #ddd;
  font-family: inherit;
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: #888;
`

interface SelectFormFieldProps {
  option: OptionDetail
  onChange: (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => void
  defaultValue: string
  shouldAddItem: boolean
}

const SelectFormField = ({
  option,
  onChange,
  defaultValue,
  shouldAddItem,
}: SelectFormFieldProps) => {
  const ref = useRef(null)

  useEffect(() => {
    if (shouldAddItem) {
      ref.current.value = defaultValue
    }
  }, [defaultValue, shouldAddItem])

  return (
    <div css={rootStyle}>
      <label css={labelStyle}>{option.name}</label>
      <select css={selectBoxStyle} onChange={onChange(option._id)} ref={ref}>
        <option>{defaultValue}</option>
        {option.variations.map(opt => (
          <option key={opt._id}>{opt.value}</option>
        ))}
      </select>
    </div>
  )
}

export default SelectFormField
