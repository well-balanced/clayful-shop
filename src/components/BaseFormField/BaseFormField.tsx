import { css } from '@emotion/react'

const rootStyle = css`
  margin: 20px 0px 20px 0px;
`

const labelStyle = css`
  display: block;
  margin: 10px 0px 10px 0px;
  font-size: 16px;
  color: #555555;
`

const inputBoxStyle = css`
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

interface BaseFormFieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  type?: string
}

const BaseFormField = ({
  label,
  value,
  onChange,
  disabled,
  type,
}: BaseFormFieldProps) => {
  return (
    <div css={rootStyle}>
      <label css={labelStyle}>{label}</label>
      <input
        css={inputBoxStyle}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
      />
    </div>
  )
}

export default BaseFormField
