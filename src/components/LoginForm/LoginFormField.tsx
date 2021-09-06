interface LoginFormFieldProps {
  label: string
  field: string
  value: string
  chnageHandler: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LoginFormField = ({
  label,
  field,
  value,
  chnageHandler,
}: LoginFormFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={field}
        id={field}
        value={value}
        onChange={chnageHandler(field)}
      ></input>
    </div>
  )
}

export default LoginFormField
