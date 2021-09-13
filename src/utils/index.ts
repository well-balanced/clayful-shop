export const omit = <K extends string | number | symbol>(
  obj: Object,
  key: K,
) => {
  const { [key]: omitted, ...rest } = obj
  return rest
}
