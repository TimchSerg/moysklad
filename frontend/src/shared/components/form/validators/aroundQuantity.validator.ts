export const aroundQuantityValidator = (min:number, max: number): Function => (value: number) =>
  value <= max && value >= min ? undefined : `Ограничение по кол-во от ${min} до ${max}`;