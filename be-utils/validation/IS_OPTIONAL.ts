import { TValidateFunction } from './type-validation'

export const IS_OPTIONAL: TValidateFunction = async <T extends object>(
  error: Record<keyof T, string>,
  value: any,
  key: keyof T
) => {
  if (value !== undefined) {
    return {}
  }

  return { [key]: '' }
}
