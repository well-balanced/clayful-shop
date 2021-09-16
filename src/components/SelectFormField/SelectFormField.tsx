import { css } from '@emotion/react'
import { useRef } from 'react'

const rootStyle = css`
  margin: 20px 0px 20px 0px;
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
  label: string
  options: string[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  defaultValue?: string
}

const SelectFormField = ({
  label,
  options,
  onChange,
  defaultValue = '선택해주세요.',
}: SelectFormFieldProps) => {
  const ref = useRef(null)

  return (
    <div css={rootStyle}>
      <label css={labelStyle}>{label}</label>
      <select css={selectBoxStyle} onChange={onChange} ref={ref}>
        <option>{defaultValue}</option>
        {options.map((value, idx) => (
          <option key={idx}>{value}</option>
        ))}
      </select>
    </div>
  )
}

export default SelectFormField
