---
id: operations
title: Operations
nav_order: 14
redirect_to: 'https://docs.easybase.io/projects/database/operations'
---

## Overview

* **Boolean** [`and`](#and) [`or`](#or) [`not`](#not)
* **Comparison** [`eq`](#equal) [`neq`](#not-equal) [`lt`](#less-than) [`gt`](#greater-than) [`lte`](#less-than-or-equal) [`gte`](#greater-than-or-equal) [`between`](#between) [`notBetween`](#not-between) [`isNull`](#is-null) [`isNotNull`](#is-not-null) [`in`](#in) [`notIn`](#not-in)
* **String** [`like`](#like) [`notLike`](#not-like)
* **Dates** [`dateLt`](#date-less-than) [`dateGt`](#date-greater-than) [`dateLte`](#date-less-than-or-equal) [`dateGte`](#date-greater-than-or-equal)
* **Aggregate** [`count`](#count) [`sum`](#sum) [`avg`](#average) [`min`](#minimum) [`max`](#maximum)


## Boolean

### And

`.and` performs logical conjunction on its arguments.

```js
e.and(true, false)

// true and false
```

Useful with other operations.

```js
e.and(e.gt('rating', 50), e.lt('rating', 80))

// 'rating' > 50 and 'rating' < 80
```

More than two arguments is allowed.

```js
e.and(true, false, true, false)

// true and false and true and false
```

### Or

`.or` performs logical disjunction on its arguments.

```js
e.or(true, false)

// true or false
```

Useful with other operations.

```js
e.or(e.like('title', 'T%'), e.lt('rating', 80))

// 'title' LIKE 'T%' or 'rating' < 80
```

More than two arguments is allowed.

```js
e.or(true, false, true, false)

// true or false or true or false
```

### Not

`.not` performs logical negation on its argument.

```js
e.not(true)

// (!true)
```


## Comparison

### Equal

`.eq` returns whether its arguments are equal.

```js
e.eq('rating', 72)

// 'rating' == 72
```

### Not Equal

`.neq` returns whether its arguments are *not* equal.

```js
e.neq('rating', 72)

// 'rating' != 72
```

### Less Than

`.lt` returns whether its first argument is less than its second argument.

```js
e.lt('rating', 72)

// 'rating' < 72
```

### Greater Than

`.gt` returns whether its first argument is greater than its second argument.

```js
e.gt('rating', 72)

// 'rating' > 72
```

### Less Than or Equal

`.lte` returns whether its first argument is less than or equal to its second argument.

```js
e.lte('rating', 72)

// 'rating' <= 72
```

### Greater Than or Equal

`.gte` returns whether its first argument is greater than or equal to its second argument.

```js
e.gte('rating', 72)

// 'rating' >= 72
```

### Between

`.between` returns whether its first argument is between its second and third arguments.

```js
e.between('rating', 50, 75)

// 'rating' between 50 and 75
```

### Is Null

`.isNull` returns whether its argument is null.

Expression | Result
-|-
true is null | false
false is null | false
null is null | true

```js
e.isNull('title')

// 'title' == null
```


### Is Not Null

`.isNull` returns whether its argument is *not* null.

Expression | Result
-|-
true is not null | true
false is not null | true
null is not null | false

```js
e.isNotNull('title')

// 'title' != null
```

### In

`.in` returns whether a value is in a *Values List*.

```js
e.in('rating', [5, 6, 7])

// 'rating' in [5, 6, 7]
```

### Not In

`.notIn` returns whether a value is *not* in a *Values List*.

```js
e.notIn('rating', [5, 6, 7])

// 'rating' not in [5, 6, 7]
```

## String

### Like

`.like` operators allows for matching string patterns in a `.where` clause.

The percent sign (%) represents zero, one, or multiple characters and the underscore sign (_) represents one, single character.

```js
await table.return().where(e.like('title', 'T%')).all()

[
  { "title": "Titanic", "rating": 75 },
  { "title": "The Lion King", "rating": 55 }
]
```

### Not Like

`.notLike` operators allows for matching inverse string patterns in a `.where` clause.

```js
await table.return().where(e.notLike('title', 'T%')).all()

[
  { "title": "Avatar", "rating": 83 },
  { "title": "Jurassic World", "rating": 59 }
]
```

## Dates

**The value must either be Date object or a string in the form 'YYYY-MM-DD'.**

### Date Less Than

`.dateLt` returns whether its first argument is less than its second argument in a date column.

```js
e.dateLt('dateCol', '2020-01-20')

// 'dateCol' < '2020-01-20'
```

### Date Greater Than

`.dateGt` returns whether its first argument is greater than its second argument in a date column.

```js
e.dateGt('dateCol', new Date())

// 'dateCol' > now()
```

### Date Less Than or Equal

`.dateLte` returns whether its first argument is less than or equal to its second argument in a date column.

```js
e.dateLte('dateCol', '2020-01-20')

// 'dateCol' <= '2020-01-20'
```

### Date Greater Than or Equal

`.dateGte` returns whether its first argument is greater than or equal to its second argument in a date column.

```js
e.dateGte('dateCol', '2020-01-20')

// 'dateCol' >= '2020-01-20'
```


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


### Minimum

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

### Maximum

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
