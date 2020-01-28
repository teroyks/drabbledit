const countWords = (string) => string ?
  string
    .trim()
    .split(/\s+/)
    .length
  : 0

export default countWords
