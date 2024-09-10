import { TValidateFunction } from './type-validation'

export const IS_PASSWORD: TValidateFunction = async <T extends object>(
  error: Record<keyof T, string>,
  value: any,
  key: keyof T
) => {
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/g

  if (!value) {
    return { ...error, [key]: 'valueRequired' }
  }
  const newValue = String(value)
  if (!newValue.match(PASSWORD_REGEX)) {
    return { ...error, [key]: 'invalidPassword' }
  }
  return { ...error, [key]: '' }
}
