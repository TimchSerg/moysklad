export const radioValidator = (value: boolean) =>
typeof value === 'boolean' ? undefined : "Обязательно для заполнения";