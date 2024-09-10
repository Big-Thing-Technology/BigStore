import dayjs from 'dayjs'

export function formatDateddMMyyyyHHmm(date: number | string | null | Date) {
  if (!date) return date as string
  return dayjs(date).format('DD-MM-YYYY HH:mm')
}
