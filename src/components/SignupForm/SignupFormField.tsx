interface SignupFormFieldProps {
  label: string
  field: string
  value: string
  changeHandler: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SignupFormField = ({
  label,
  field,
  value,
  changeHandler,
}: SignupFormFieldProps) => {
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

export default SignupFormField
