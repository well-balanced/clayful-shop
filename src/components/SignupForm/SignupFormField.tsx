interface SignupFormFieldProps {
  label: string
  field: string
  value: string
  chnageHandler: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SignupFormField = ({
  label,
  field,
  value,
  chnageHandler,
}: SignupFormFieldProps) => {
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

export default SignupFormField
