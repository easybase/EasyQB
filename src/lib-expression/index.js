const {
    unaryPre,
    unaryPost,
    unaryFunction,
    binary,
    ternary,
    nary,
    naryFunction,
    oneValue,
    compositeValue,
    membership,
    quantifiedComparison,
    dateBinary
} = require('./util')

// value
const value = {
    arg: compositeValue,
    row: compositeValue,
    unknown: oneValue,
    boolean: oneValue,
    number: oneValue,
    string: oneValue,
    array: oneValue,
    json: oneValue,
    table: oneValue
}

// boolean
const boolean = {
    // logical
    and: nary('and'),
    or: nary('or'),
    not: unaryFunction('not'),
    // comparison
    isTrue: unaryPost('is true'),
    isNotTrue: unaryPost('is not true'),
    isFalse: unaryPost('is false'),
    isNotFalse: unaryPost('is not false'),
    isUnknown: unaryPost('is unknown'),
    isNotUnknown: unaryPost('is not unknown')
}

// comparison
const comparison = {
    // binary comparison
    eq: binary('='),
    neq: binary('<>'),
    lt: binary('<'),
    gt: binary('>'),
    lte: binary('<='),
    gte: binary('>='),
    // misc
    between: ternary('between', 'and'),
    isDistinctFrom: binary('is distinct from'),
    isNotDistinctFrom: binary('is not distinct from'),
    isNull: unaryPost('is null'),
    isNotNull: unaryPost('is not null'),
    in: membership('in'),
    notIn: membership('not in'),
    // quantified any
    eqAny: quantifiedComparison('= any'),
    neqAny: quantifiedComparison('<> any'),
    ltAny: quantifiedComparison('< any'),
    gtAny: quantifiedComparison('> any'),
    lteAny: quantifiedComparison('<= any'),
    gteAny: quantifiedComparison('>= any'),
    // quantified all
    eqAll: quantifiedComparison('= all'),
    neqAll: quantifiedComparison('<> all'),
    ltAll: quantifiedComparison('< all'),
    gtAll: quantifiedComparison('> all'),
    lteAll: quantifiedComparison('<= all'),
    gteAll: quantifiedComparison('>= all')
}

// dates
const dateComparison = {
    // dateEq: dateBinary('='),
    // dateNeq: dateBinary('<>'),
    dateLt: dateBinary('<'),
    dateGt: dateBinary('>'),
    dateLte: dateBinary('<='),
    dateGte: dateBinary('>=')
}

// math
const math = {
    add: binary('+'),
    sub: binary('-'),
    mul: binary('*'),
    div: binary('/'),
    mod: binary('%'),
    exp: binary('%'),
    sqrt: unaryPre('|/'),
    cbrt: unaryPre('||/'),
    fact: unaryPre('!!'),
    abs: unaryFunction('abs')
}

// string
const string = {
    like: binary('like'),
    notLike: binary('not like')
}

const array = {
    unnest: naryFunction('unnest')
}

module.exports = {
    ...value,
    ...boolean,
    ...comparison,
    ...math,
    ...array,
    ...dateComparison,
    ...string
}
