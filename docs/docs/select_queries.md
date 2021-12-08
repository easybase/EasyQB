---
id: select-queries
title: Select
nav_order: 10
redirect_to: 'https://docs.easybase.io/projects/database/select'
---

## Overview

* **Select** [`.return`](#select)
* **Where** [`.where`](#where)
* **Order By** [`.orderBy`](#order-by)
* **Limit** [`.limit`](#limit)
* **Offset** [`.offset`](#offset)
* **Aggregate** [`.sum`, `.count`, `.avg`, `.max`, `.min`](#aggregate)
* **Group By** [`.groupBy`](#group-by)

## Initialize
```js
import Easybase from "easybasejs";
import ebconfig from "./ebconfig.js";

const table = Easybase.EasybaseProvider({ ebconfig }).db("MYTABLE");
const { e } = table; // Optional query expressions
```

## Example Table
For the following queries, consider the data table below:
```json
[
  { "title": "Avatar", "rating": 83 },
  { "title": "Titanic", "rating": 75 },
  { "title": "The Lion King", "rating": 55 },
  { "title": "Jurassic World", "rating": 59 }
]
```

## Select

`.return` builds queries to select from. **After building a query , use `.all` or `.one` to execute it.** This applies to all types of queries.

```js
await table.return().all();

[
  { "title": "Avatar", "rating": 83 },
  { "title": "Titanic", "rating": 75 },
  { "title": "The Lion King", "rating": 55 },
  { "title": "Jurassic World", "rating": 59 },
]
```

`.one` will only return the first match.

```js
await table.return().one();

{ "title": "Avatar", "rating": 83 }
```

Pass arguments into `.return` to select only specific columns.

```js
await table.return("title").one();

{ "title": "Avatar" }
```

**Note** that each record will also have a persistent, unique identifier called `_key`. This is useful for performing operations on specific records.

```js
await table.return().one();

{ "title": "Avatar", "rating": 83, "_key": "507f191e810d19729de860ea" },
```


## Where

`.where` builds *where* clauses. Expressions, `e`, are are used to create comparisons and boolean logic. **[Learn more about expressions and operations](operations.html)**.

```js
const { e } = table;
await table.return().where(e.eq("title", "The Lion King")).one() // Equals

{ "title": "The Lion King", "rating": 55 }
```

Conditions can be objects in the form `{ field: value }`.

Each property generates a `field = value` clause.

```js
await table.return().where({ title: "The Lion King", rating: 55 }).all()

[
  { "title": "The Lion King", "rating": 55 }
]
```

Use [Operations](operations.html) to build complex conditions with [`e.and`](operations#and), [`e.or`](operations#or) and [`e.not`](operations#not).

```js
await table.return().where(
  e.or(
    e.eq("title", "The Lion King"), // Equals
    e.gt("rating", 80) // Greater than
  )
).all()

[
  { "title": "Avatar", "rating": 83 },
  { "title": "The Lion King", "rating": 55 }
]
```

`array` arguments generate a `field in values` expression.

```js
await table.return().where({ rating: [55, 56, 57, 58, 59] }).all()

[
  { "title": "The Lion King", "rating": 55 },
  { "title": "Jurassic World", "rating": 59 }
]
```

## Order By

Specify row ordering with `.orderBy`. This function accepts objects.

The property `by` is used for ordering. Set property `sort` to either `'asc'` or `'desc'`.

```js
await table().return().orderBy({ by: "rating", sort: "asc" }).all()

[
  { "title": "The Lion King", "rating": 55 },
  { "title": "Jurassic World", "rating": 59 },
  { "title": "Titanic", "rating": 75 },
  { "title": "Avatar", "rating": 83 }
]
```

`.orderBy` accepts multiple sort objects, which will be evaluated in order.

```js
await table().return().orderBy({ by: "rating", sort: "asc" }, { by: "title", sort: "desc" }).all()

[
  { "title": "The Lion King", "rating": 55 },
  { "title": "Jurassic World", "rating": 59 },
  { "title": "Titanic", "rating": 75 },
  { "title": "Avatar", "rating": 83 }
]
```

## Limit

Pass `.limit` the maximum number of rows to fetch.

```js
await table.return().limit(2).all()

[
  { "title": "Avatar", "rating": 83 },
  { "title": "Titanic", "rating": 75 }
]
```

## Offset

Pass `.offset` the number of rows to skip before returning rows.

```js
await table.return().offset(1).all()

[
  { "title": "Titanic", "rating": 75 },
  { "title": "The Lion King", "rating": 55 },
  { "title": "Jurassic World", "rating": 59 }
]
```

`.offset` and `.limit` can be used in conjugation for pagination of your data table.

```js
let page = 0;

await table.return().limit(2).offset(page * 2).all();

[
  { "title": "Avatar", "rating": 83 },
  { "title": "Titanic", "rating": 75 }
]

page++;
await table.return().limit(2).offset(page * 2).all();

[
  { "title": "The Lion King", "rating": 55 },
  { "title": "Jurassic World", "rating": 59 }
]
```

## Aggregate

The following aggregators can be used in `.return` from the expression object: [`.min`](operations.html#minimum), [`.max`](operations.html#maximum), [`.sum`](operations.html#sum), [`.avg`](operations.html#average), and [`.count`](operations.html#count).

```js
await table.return(e.avg('rating')).all()

[ { avg_rating: 68 } ]
```

Aggregators are powerful when combined be used with a `.where` clause.

```js
await table.return(e.count('rating')).where(e.gt('rating', 70)).all()

{ count: 2 }
```


Can be called with either `.one` or `.all`. There is no difference between the two.

```js
await table.return(e.sum('rating')).one()

[ { sum_rating: 272 } ]
```

## Group By

`.groupBy` accepts a column name and builds *group by* clauses. You must also provide some aggregator function in `return`. This often has no effect on the resulting aggregation.

```js
await table.return(e.avg('rating')).groupBy('rating').all()

[ { avg_rating: 68 } ]
```


<!-- 
## Having

Filter groups with `.having`. `.having` accepts the  same arguments as [`.where`](#where).

This will filter rows used in some aggregate method.

```js
await table.return('avg(rating)').groupBy('rating').having(e.lt('rating', 83)).all()

{ text: 'select * from person group by age having (age < $1)',
  args: [20] }
``` -->