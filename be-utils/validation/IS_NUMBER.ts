import { TValidateFunction } from './type-validation'

export const IS_NUMBER: TValidateFunction = async <T extends object>(
  error: Record<keyof T, string>,
  value: any,
  key: keyof T
) => {
  if (!value) {
    return { ...error, [key]: 'valueRequired' }
  }

  const isNumber = (val: any) => !Number.isNaN(Number(val))

  if (!isNumber(value)) {
    return { ...error, [key]: 'mustBeNumber' }
  }

  if (value < 0) {
    return { ...error, [key]: 'mustBePositive' }
  }
  if (value > Number.MAX_SAFE_INTEGER) {
    return { ...error, [key]: 'mustBeLessThanMaxSafeInt' }
  }

  return { ...error, [key]: '' }
}
