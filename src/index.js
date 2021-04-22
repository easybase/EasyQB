const core = require('./lib-core')
const dialect = require('./dialect-postgres')

module.exports = core({ dialect });
