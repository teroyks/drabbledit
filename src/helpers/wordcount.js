/**
 * @param {string} str 
 * @returns {boolean}
 */
const ignoreNonWords = str => str.match(/\w/i)

/**
 * @param {string} string 
 * @returns {int}
 */
const countWords = (string) => string ?
  string
    .trim()
    .split(/\s+/)
    .filter(ignoreNonWords)
    .length
  : 0

export default countWords
