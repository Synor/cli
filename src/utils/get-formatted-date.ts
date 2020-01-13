// https://stackoverflow.com/a/13219636/4456924

export function getFormattedDate(inputDate: string | number | Date) {
  const date = new Date(inputDate)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '')
}
