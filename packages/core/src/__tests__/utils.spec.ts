import { generateRandomString } from '../utils'

describe('utils.generateRandomString', () => {
  it('should generate a random string of the given length', () => {
    const result = generateRandomString(10)
    expect(result).toHaveLength(10)
  })

  it('should default to a length of 8 if not specified', () => {
    const result = generateRandomString()
    expect(result).toHaveLength(8)
  })
})
