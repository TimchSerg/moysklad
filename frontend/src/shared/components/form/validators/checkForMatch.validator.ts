export const checkForMatchValidator = (confirm: any) => (value: any) =>
  confirm === value ? undefined : `Значения не совпадают`;
