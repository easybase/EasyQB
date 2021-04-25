// eslint-disable-next-line no-useless-escape
const wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/
const capitals = /[A-Z\u00C0-\u00D6\u00D9-\u00DD]/g

const snakeCase = str => {
  // HACK: if user enters name with parentheses, return string is
  // TODO: intelligently handle snakecasing components
  return str.indexOf('(') === -1
    ? str
      .split('.')
      .map(s => justSnakeCase(s))
      .join('.')
    : str
}

const justSnakeCase = str => {
  str = str.replace(capitals, match => ' ' + (match.toLowerCase() || match))
  return str
    .trim()
    .split(wordSeparators)
    .join('_')
}

// included to mitigate cost of case conversion
const memoize = fn => {
  const cache = {}
  return key => cache[key] || (cache[key] = fn(key))
}

module.exports = {
  snakeCase,
  memoize
}