import { isTimeFormat } from "shared/utils/timeFormat.util";

export const timeFormatValidator = (value: string): string | undefined => {
  if(value === null) return  "Не верно указан формат времени (чч:мм)";
  try {
    const parser = value.split(' - ');
    return isTimeFormat(parser[0]) && isTimeFormat(parser[1]) ? undefined : "Не верно указан формат времени (чч:мм)";
  } catch (error) {
    return  "Не верно указан формат времени (чч:мм)";
  }
  
}