import moment from "moment";

export function toDate(date) {
  if (!date) return "-";

  return moment(date).format("DD.MM.YYYY HH:mm");
}

export function toDateNoTime(date) {
  if (!date) return "-";

  return moment(date).format('ll');
}

export function toTime(date) {
  if (!date) return "-";

  return moment(date).format("HH:mm:ss");
}