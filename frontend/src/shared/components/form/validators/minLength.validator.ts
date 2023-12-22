export const minLengthValidator = (min: number): Function => (value: string): string | void => {
  return value.length > min ? undefined : `Минимальное кол-во символов ${min}`;
}
