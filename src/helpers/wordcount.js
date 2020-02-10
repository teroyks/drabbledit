const ignoreNonWords = str => str.match(/\w/i)

const countWords = (string) => string ?
  string
    .trim()
    .split(/\s+/)
    .filter(ignoreNonWords)
    .length
  : 0

export default countWords
