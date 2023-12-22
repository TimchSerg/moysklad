export function toPhone(phone) {
  if (!phone) return "-";
  
  return phone.replace(/(\d)(\d\d\d)(\d\d\d)(\d\d)(\d\d)/, "+$1($2)$3-$4-$5");
}