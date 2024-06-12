import { expect, describe, it } from 'vitest'

describe('Test suite', () => {
  it('should be uppercase FOO', () => {
    expect('foo'.toUpperCase()).toEqual('FOO')
  })
})
