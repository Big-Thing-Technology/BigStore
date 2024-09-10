export type TValidateFunction<T = {}, V = {}, P = {}> = (
  error: Record<keyof T, string>,
  value: V,
  key: keyof T,
  params: P
) => Promise<Record<keyof T, string>>
