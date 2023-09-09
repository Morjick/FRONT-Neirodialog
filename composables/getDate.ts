export const getDate = (date: string): string => {
  if (!date) { return '' }

  return date.split('T')[0]?.split('-')?.reverse()?.join('.')
}
