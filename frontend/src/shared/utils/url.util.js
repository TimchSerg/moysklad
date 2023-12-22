// eslint-disable-next-line
const REGEXP_URL = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

/**
 * verification of url Validation
 *
 * @param {string} url format
 * @returns {boolean} return true or false
 */
export function isUrl(url) {
  REGEXP_URL.lastIndex = 0;
  if (typeof url != "string") return false;

  return REGEXP_URL.test(url);
}
