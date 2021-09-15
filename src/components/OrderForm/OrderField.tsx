interface OrderFieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const OrderFormField = ({
  label,
  value,
  onChange,
  disabled,
}: OrderFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={onChange} disabled={disabled} />
    </div>
  )
}

export default OrderFormField
