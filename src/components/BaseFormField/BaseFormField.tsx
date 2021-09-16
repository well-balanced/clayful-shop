interface BaseFormFieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const BaseFormField = ({
  label,
  value,
  onChange,
  disabled,
}: BaseFormFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={onChange} disabled={disabled} />
    </div>
  )
}

export default BaseFormField
