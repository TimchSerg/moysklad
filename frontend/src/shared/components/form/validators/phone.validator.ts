import { isE164 } from "shared/utils/phone.util";

export const phoneValidator = (value: string | null): string | void => {
  if(!value) return undefined;
  return value && isE164(value) ? undefined : "Номер телефона указан не верно";
}
  
