import { TValidateFunction } from './type-validation'

export const IS_GENDER: TValidateFunction = async <T extends object>(
  error: Record<keyof T, string>,
  value: any,
  key: keyof T
) => {
  if (typeof value === 'undefined' || value === null) {
    return { ...error, [key]: 'valueRequired' }
  }
  if (typeof value !== 'number' || (Number(value) !== 0 && Number(value) !== 1)) {
    return { ...error, [key]: 'invalidGender' }
  }
  return { ...error, [key]: '' }
}
