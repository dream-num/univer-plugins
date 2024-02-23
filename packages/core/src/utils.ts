/**
 * Generates a random string of a given length.
 *
 * @param {number} [length] - The length of the string to generate. Defaults to 8 if not specified.
 * @returns {string} A randomly generated string containing uppercase and lowercase letters.
 */
export function generateRandomString(length?: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const len = length ?? 8

  let result = ''

  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}
