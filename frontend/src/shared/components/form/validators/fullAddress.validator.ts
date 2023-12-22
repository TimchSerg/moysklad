export const fullAddressValidator = (value: any): string | undefined => {
  if(value === null ) return "Адрес введен не полностью";

  const result = !!value?.data?.house;
  return result ? undefined : "Адрес введен не полностью";
}