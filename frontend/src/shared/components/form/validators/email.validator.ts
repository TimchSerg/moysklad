import { isEmail } from "shared/utils/isEmail";

export const emailValidator = (value: string): string | void => {
  if(!value) return undefined;
  return isEmail(value) ? undefined : "E-mail указан не верно";
}
  
