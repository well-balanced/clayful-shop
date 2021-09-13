interface LoginFormFieldProps {
  label: string
  field: string
  value: string
  changeHandler: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LoginFormField = ({
  label,
  field,
  value,
  changeHandler,
}: LoginFormFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={field}
        id={field}
        value={value}
        onChange={() => changeHandler(field)}
      ></input>
    </div>
  )
}

export default LoginFormField
