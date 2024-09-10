import { TValidateFunction } from './type-validation'

export const IS_REQUIRED: TValidateFunction = async <T extends object>(
  error: Record<keyof T, string>,
  value: any,
  key: keyof T
) => {
  if (!value) {
    return { ...error, [key]: 'valueRequired' }
  }

  if (typeof value === 'string' && (value.trim().length === 0 || value.length > 255)) {
    return { ...error, [key]: 'mustBeStringAndLessThan255' }
  }

  return { ...error, [key]: '' }
}
