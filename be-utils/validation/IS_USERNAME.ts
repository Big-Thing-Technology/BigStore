import { TValidateFunction } from './type-validation'

export const IS_USERNAME: TValidateFunction = async <T extends object>(
  error: Record<keyof T, string>,
  value: any,
  key: keyof T
) => {
  if (!value) {
    return { ...error, [key]: 'usernameRequired' }
  }
  const newValue = String(value)
  const USERNAME_REGEX = /^[a-zA-Z0-9\\._\\-]{3,}$/g

  if (!newValue.match(USERNAME_REGEX)) {
    return { ...error, [key]: 'invalidUsername' }
  }
  return { ...error, [key]: '' }
}
