export function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''

  for (let i = 0; i < length ?? 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}
