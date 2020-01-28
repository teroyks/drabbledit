import assert from 'assert'
import countWords from '../src/helpers/wordcount'

describe('Word count', function () {
  it('should return 0 when string is empty', function () {
    assert.equal(countWords(''), 0)
  })
})
