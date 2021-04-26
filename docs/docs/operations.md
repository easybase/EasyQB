---
id: operations
title: Operations
---

## Overview

* **Boolean** [`and`](#and) [`or`](#or) [`not`](#not)
* **Comparison** [`eq`](#equal) [`neq`](#not-equal) [`lt`](#less-than) [`gt`](#greater-than) [`lte`](#less-than-or-equal) [`gte`](#greater-than-or-equal) [`between`](#between) [`notBetween`](#not-between) [`isNull`](#is-null) [`isNotNull`](#is-not-null) [`in`](#in) [`notIn`](#not-in)
<!-- * **Date and Time** [`age`](#age) [`now`](#now) [`extract`](#extract) -->
* **Aggregate** [`count`](#count) [`sum`](#sum) [`avg`](#average) [`min`](#min) [`max`](#max)


## Boolean

### And

* `and: boolean => ...boolean => boolean`

`.and` performs logical conjunction on its arguments.

```js
e.and(true, false)

{ text: '$1 and $2',
  args: [true, false] }
```

At least one argument is required.

```js
e.and() // throws error

e.and(true)

{ text: '$1',
  args: [true] }
```

More than two arguments is allowed.

```js
e.and(true, false, true, false)

{ text: '$1 and $2 and $3 and $4',
  args: [true, false, true, false] }
```

### Or

* `or: boolean => ...boolean => boolean`

`.or` performs logical disjunction on its arguments.

```js
e.or(true, false)

{ text: '$1 or $2',
  args: [true, false] }
```

At least one argument is required.

```js
e.or() // throws error

e.or(true)

{ text: '$1',
  args: [true] }
```

More than two arguments is allowed.

```js
e.or(true, false, true, false)

{ text: '$1 or $2 or $3 or $4',
  args: [true, false, true, false] }
```

### Not

* `not: boolean => boolean`

`.not` performs logical negation on its argument.

```js
e.not(true)

{ text: 'not($1)',
  args: [true] }
```


## Comparison

### Equal

* `eq: T => T => boolean`

`.eq` returns whether its arguments are equal.

```js
e.eq('moo', 'moo')

{ text: '$1 = $2',
  args: ['moo', 'moo'] }
```

### Not Equal

* `neq: T => T => boolean`

`.neq` returns whether its arguments are *not* equal.

```js
e.neq('moo', 'moo')

{ text: '$1 <> $2',
  args: ['moo', 'moo'] }
```

### Less Than

* `lt: T => T => boolean`

`.lt` returns whether its first argument is less than its second argument.

```js
e.lt('moo', 'moo')

{ text: '$1 < $2',
  args: ['moo', 'moo'] }
```

### Greater Than

* `gt: T => T => boolean`

`.gt` returns whether its first argument is greater than its second argument.

```js
e.gt('moo', 'moo')

{ text: '$1 > $2',
  args: ['moo', 'moo'] }
```

### Less Than or Equal

* `lte: T => T => boolean`

`.lte` returns whether its first argument is less than or equal to its second argument.

```js
e.lte('moo', 'moo')

{ text: '$1 <= $2',
  args: ['moo', 'moo'] }
```

### Greater Than or Equal

* `gte: T => T => boolean`

`.gte` returns whether its first argument is greater than or equal to its second argument.

```js
e.gte('moo', 'moo')

{ text: '$1 >= $2',
  args: ['moo', 'moo'] }
```

### Between

* `between: T => T => T => boolean`

`.between` returns whether its first argument is between its second and third arguments.

```js
e.between(5, 3, 9)

{ text: '$1 between $2 and $3',
  args: [5, 3, 9] }
```

### Not Between

* `notBetween: T => T => T => boolean`

`.notBetween` returns whether its first argument is *not* between its second and third arguments.

```js
e.notBetween(5, 3, 9)

{ text: '$1 not between $2 and $3',
  args: [5, 3, 9] }
```

### Is Null

* `isNull: T => boolean`

`.isNull` returns whether its argument is null.

Expression | Result
-|-
true is null | false
false is null | false
null is null | true

```js
e.isNull(null)

{ text: '$1 is null',
  args: [null] }
```


### Is Not Null

* `isNotNull: T => boolean`

`.isNull` returns whether its argument is *not* null.

Expression | Result
-|-
true is not null | true
false is not null | true
null is not null | false

```js
e.isNotNull(null)

{ text: '$1 is not null',
  args: [null] }
```

### In

* `in: T => T[] => boolean`
* `in: T => table => boolean`

`.in` returns whether a value is in a *Values List*.

```js
e.in(7, [5, 6, 7])

{ text: '$1 in ($2, $3, $4)',
  args: [7, 5, 6, 7] }
```

`.in` is equivalent to [`.eqAny`](#equal-any) when the second argument is a table.

```js
e.in(4, [3, 4, 5])

{ text: '$1 in ($2, $3, $4)',
  args: [4, 3, 4, 5] }

e.eqAny(4, [3, 4, 5])

{ text: '$1 = any($2)',
  args: [4, [3, 4, 5]] }
```

### Not In

* `notIn: => T => table => boolean`
* `notIn: => T => T[] => boolean`

`.notIn` returns whether a value is *not* in a *Values List*.

```js
e.notIn(7, [5, 6, 7])

{ text: '$1 not in ($2, $3, $4)',
  args: [7, 5, 6, 7] }
```

`.notIn` is equivalent to [`.neqAll`](#not-equal-all) when the second argument is a table.

```js
e.notIn(4, [3, 4, 5])

{ text: '$1 not in ($2, $3, $4)',
  args: [4, 3, 4, 5] }

e.neqAll(4, [3, 4, 5])

{ text: '$1 <> all($2)',
  args: [4, [3, 4, 5]] }
```

<!-- ## Date and Time

### Age

TODO

### Now

TODO

### Extract

TODO -->

## Aggregate

### Count

`.count` in a `.return` field returns the count of that query.

```js
await table.return(e.count('rating')).one()

{ count: 4 }
```

Can be combined with a `.where` clause.

```js
await table.return(e.count('rating')).where(e.gt('rating', 70)).one()

{ count: 2 }
```


### Sum

`.sum` in a `.return` field returns the sum of that column.

```js
await table.return(e.sum('rating')).one()

{ sum_rating: 272 }
```

Can be combined with a `.where` clause.

```js
await table.return(e.sum('rating')).where(e.gt('rating', 70)).one()

{ sum_rating: 158 }
```


### Average

`.avg` in a `.return` field returns the avg of that column.

```js
await table.return(e.avg('rating')).one()

{ avg_rating: 68 }
```

Can be combined with a `.where` clause.

```js
await table.return(e.avg('rating')).where(e.gt('rating', 70)).one()

{ avg_rating: 79 }
```


### Min

`.min` in a `.return` field returns the minimum value of that column.

```js
await table.return(e.min('rating')).one()

{ min_rating: 55 }
```

Can be combined with a `.where` clause.

```js
await table.return(e.min('rating')).where(e.gt('rating', 70)).one()

{ min_rating: 75 }
```

### Max

`.max` in a `.return` field returns the maximum value of that column.

```js
await table.return(e.max('rating')).one()

{ max_rating: 83 }
```

Can be combined with a `.where` clause.

```js
await table.return(e.max('rating')).where(e.lt('rating', 70)).one()

{ max_rating: 59 }
```
