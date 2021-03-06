const createQueryBuilder = require('../builder-sq')
const createExpressionBuilder = require('../builder-expression')
const { memoize, normalKey } = require('../lib-util')


/**
 * Creates a version of EasyQB for the given SQL dialect and database adapter.
 *
 * A dialect is variant of the SQL language,
 * while an adapter is the driver that communicates with the database.
 *
 * This design makes it easy to swap drivers, e.g. mysql vs mysql2 or
 * add new databases just by connecting a new adapter to an existing dialect.
 *
 */

const createSqorn = ({ dialect }) => (config = {}) => {
  const { query, expression, parameterize, escape } = dialect

  // 1. Create default context properties passed through build tree
  const mapKey = memoize(normalKey)
  const defaultContext = { parameterize, escape, mapKey, build }

  // 2. Create Expression Builder
  const e = createExpressionBuilder({ defaultContext, expression })

  // 3. Create Query Builder
  const sq = createQueryBuilder({ defaultContext, query, e, config })

  // 4. TODO: Build Executor, Attach e and execute functions

  // 5. TODO: Return { sq, e, transaction, db }
  return sq
}

function build(arg) {
  if (arg === undefined) throw Error('Error: undefined argument')
  if (typeof arg === 'function') {
    if (arg._build) {
      const { type, text } = arg._build(this)
      if (type === 'expression') return text
      if (type === 'fragment') return text
      return `(${text})`
    }
    return arg(this)
  }
  return this.unparameterized ? this.escape(arg) : this.parameterize(arg)
}

module.exports = createSqorn