export const maxLengthValidator = (max: number): Function => (value: string) =>
  value.length <= max ? undefined : `Максимальное кол-во символов ${max}`;
