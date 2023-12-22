export const REGEX_E164 = /^\+[0-9]{6,15}$/;

/**
 * verification of Phone Validation
 *
 * @param {string} phone format E164
 * @returns {boolean} return true or false
 */
export function isE164(phone) {
  if (typeof phone != "string") return false;

  return REGEX_E164.test(phone);
}
