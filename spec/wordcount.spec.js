import assert from 'assert'
import countWords from '../src/helpers/wordcount'

describe('Word count', function () {
  it('should return 0 when string is empty', function () {
    assert.equal(countWords(''), 0)
    assert.equal(countWords(null), 0)
    assert.equal(countWords(undefined), 0)
  })

  it('should count words for a sentence', function () {
    assert.equal(countWords('foo'), 1)
    assert.equal(countWords('this is a sentence.'), 4)
  })

  it('should ignore multiple whitespace', function () {
    assert.equal(countWords('foo   bar'), 2)
  })

  it('should count words in multi-line sentences', function () {
    assert.equal(countWords('This\nis a sentence\non many lines'), 7)
    assert.equal(countWords('Different \r\nseparator'), 2)
  })

  it('should ignore whitespace in the beginning and end of the text', function () {
    assert.equal(countWords('  foo bar   \n\n \n'), 2)
  })

  it('should ignore dialog dashes', function () {
    assert.equal(countWords('— dialog line\n— second line\n'), 4)
  })

  it('should ignore dashes', function () {
    assert.equal(countWords('Do not count en – or em — dashes'), 7)
  })

  it('should understand non-breaking spaces', function () {
    assert.equal(countWords('Non breaking spaces'), 3)
  })

  it('should ignore subheadings')
})
