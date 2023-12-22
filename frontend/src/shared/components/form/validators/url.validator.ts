import { isUrl } from "shared/utils/url.util";

export const urlValidator = (value: string | null): string | void => {
  if(!value) return undefined;
  return value && isUrl(value) ? undefined : "Ссылка введена не верно! Пример: https://example.com";
}
  
