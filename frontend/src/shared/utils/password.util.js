export const REGEX_PASSWORD = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}/g;
export const REGEX_PASSWORD14 = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{14,}/g;
export const REGEX_BACKSPACE = /[_]{1,}/g;

/**
 * verification of Password Validation
 *
 * @param {string} pass
 * @returns {boolean} return true or false
 */
export function isPassword(pass) {
  REGEX_PASSWORD.lastIndex = 0;

  if (typeof pass != "string") return false;

  if (pass.length > 16) return false;

  let isBackspace = pass.split(" ").join("_").match(REGEX_BACKSPACE);
  if (isBackspace) return false;

  return REGEX_PASSWORD.test(pass);
}
