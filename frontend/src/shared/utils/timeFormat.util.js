export const REGEX_TIME = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gi;

/**
 * verification of TimeFormat Validation
 *
 * @param {string} time format string
 * @returns {boolean} return true or false
 */
export function isTimeFormat(time) {
  REGEX_TIME.lastIndex = 0;
  if (typeof time != "string") return false;

  return REGEX_TIME.test(time);
}