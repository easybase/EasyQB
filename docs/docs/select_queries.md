---
id: select-queries
title: Select
nav_order: 10
---

## Overview

* **With** [`.with`](#with) [`.withRecursive`](#recursive-ctes)
* **Select** [`.return`](#select)
* **Distinct** [`.distinct`](#distinct) [`.distinctOn`](#distinct-on)
* **From** [`.from`](#from) [`.join`](#joins) [`.leftJoin`](#joins) [`.rightJoin`](#joins) [`.fullJoin`](#joins) [`.crossJoin`](#joins) [`.naturalJoin`](#joins) [`.naturalLeftJoin`](#joins) [`.naturalRightJoin`](#joins) [`.naturalFullJoin`](#joins) [`.on`](#on) [`.using`](#using)
* **Where** [`.where`](#where)
* **Group By** [`.groupBy`](#group-by) [`.rollup`](#rollup) [`.cube`](#cube) [`.groupingSets`](#grouping-sets)
* **Having** [`.having`](#having)
* **Sets** [`.union`](#union-intersect-except) [`.intersect`](#union-intersect-except) [`.except`](#union-intersect-except) [`.unionAll`](#union-all-intersect-all-except-all) [`.intersectAll`](#union-all-intersect-all-except-all) [`.exceptAll`](#union-all-intersect-all-except-all)
* **Order By** [`.orderBy`](#order-by)
* **Limit** [`.limit`](#limit)
* **Offset** [`.offset`](#offset)

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

`.return` builds queries to select from. After building a query of any kind, use `.all` or `.one` to execute it.

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

## Where

`.where` builds *where* clauses. Expressions, `e`, are are used to create comparisons and boolean logic. [Learn more about expressions](docs/expressions.html).

```js
await table.return().where(e.eq("title", "The Lion King")).one()

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

Use [Expressions](expressions) to build complex conditions with [`e.and`](operations#and), [`e.or`](operations#or) and [`e.not`](operations#not).

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

Property `by` is used for ordering. It can be a string, [Expression](expressions), [Fragment](manual-queries#fragments) or [Subqueries](manual-queries#subqueries). Set property `sort` to either `'asc'` or `'desc'`.

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


## Joins

`.join`, `.leftJoin`, `.rightJoin` and `.fullJoin` build inner, left, right and full joins respectively. Either [`.on`](#on) or [`.using`](#using) must be called immediately after.

```js
sq.from`book`.join`author`.on`book.author_id = author.id`.query

{ text: 'select * from book join author on (book.author_id = author.id)',
  args: [] }
```

`.naturalJoin`, `.naturalLeftJoin`, `.naturalRightJoin` and `.naturalFullJoin` build natural joins. Calling [`.on`](#on) or [`.using`](#using) after a natural join is invalid.

```js
sq.from`book`.naturalRightJoin`author`.query

{ text: 'select * from book natural right join author',
  args: [] }
```

`.crossJoin` builds a cross join.

```js
sq.from`book`.crossJoin`author`.query

{ text: 'select * from book cross join author',
  args: [] }
```

Join methods accept the  same arguments as [`.from`](#from).

```js
sq.from({ b: 'book' })
  .naturalFullJoin({ a: 'author' })
  .naturalRightJoin('publisher')
  .query

{ text: 'select book b natural full join author a natural right join publisher',
  args: [] }

```

### On

`.on` specifies join conditions. It accepts the  same arguments as [`.where`](#where). `.on` must be called exactly once.

```js
sq.from({ b: 'book' })
  .join({ a: 'author'}).on({ 'b.author_id': sq.raw('a.id') })
  .query

{ text: 'select * from book b join author a on (b.author_id = a.id)',
  args: [] }
```

Build complex join conditions with [Expressions](expressions).

```js
sq.from({ t: 'ticket' })
  .leftJoin({ p: 'person' })
  .on(e.or(
    e.eq`p.first_name``t.first_name`,
    e.eq`p.last_name``t.last_name`
  ))
  .query

{ text: 'select * from ticket t left join person p on ((p.first_name = t.first_name) or (p.last_name = t.last_name))',
  args: [] }
```

### Using

Alternatively, specify join columns with `.using`. `.using` must be called exactly once.

```js
sq.from`book`.join`author`.using`author_id`.query

{ text: 'select * from book join author using (author_id)',
  args: [] }
```

`.using` accepts strings.

```js
sq.from('a').join('b').using('x', 'y', 'z').query

{ text: 'select * from a join b using (x, y, z)',
  args: [] }
```

## Sets

### Union, Intersect, Except

Pass select subqueries to `.union`, `.intersect` and `.except` to perform set operations.

```js
const Person = sq.from`person`
const Young = Person.where`age < 30`
const Middle = Person.where`age >= 30 and age < 60`
const Old = Person.where`age >= 60`

Person.except(Young).query

{ text: 'select * from person except (select * from person where (age < 30))',
  args: [] }

Young.union(Middle, Old).query

{ text: 'select * from person where (age < 30) union (select * from person where (age >= 30 and age < 60)) union (select * from person where (age >= 60))',
  args: [] }
```

### Union All, Intersect All, Except All

`.unionAll`, `.intersectAll` and `.exceptAll` can be used to prevent duplicate elimination.

```js
Young.unionAll(Old).query

{ text: 'select * from person where (age < 30) union all (select * from person where (age >= 60))',
  args: [] }
```

Set operators can be chained.

```js
Person.except(Young).intersect(Person.except(Old)).query

{ text: 'select * from person except (select * from person where (age < 30)) intersect (select * from person except (select * from person where (age >= 60)))',
  args: [] }
```

## With

Construct CTEs (Common Table Expressions) with `.with`.

```js
sq.with`n (select ${20} age)`.from`n`.return`age`.query

{ text: 'with n (select $1 age) select age from n',
  args: [20] }
```

`.with` can be called multiple times.

```js
sq.with`width (select ${10} n)`
  .with`height (select ${20} n)`
  .return`width.n * height.n area`
  .query

{ text: 'with width (select $1 n), height (select $2 n) select width.n * height.n area',
  args: [10, 20] }
```

`.with` accepts objects in the form `{ alias: table }`. Tables can be [Subqueries](manual-queries#subqueries).

```js
sq.with({
    width: sq.return({ n: 10 }),
    height: sq.sql`select ${20} n`
  })
  .return({ area: sq.txt`width.n * height.n` })
  .query

{ text: 'with width (select $1 n), height (select $2 n) select width.n * height.n area',
  args: [10, 20] }
```

Tables can be arrays of row objects. A *values* clause is generated. Column names are inferred from all keys.

```js
const people = [{ age: 7, name: 'Jo' }, { age: 9, name: 'Mo' }]
sq.with({ people }).return`max(age)`.from`people`.query

{ text: 'with people(age, name) (values ($1, $2), ($3, $4)) select max(age) from people',
  args: [7, 'Jo', 9, 'Mo'] }
```

### Recursive CTEs

`.withRecursive` creates a *recursive* CTE.

```js
const one = sq.return`1`
const next = sq.return`n + 1`.from`t`.where`n < 100`
sq.withRecursive({ 't(n)': one.unionAll(next) })
  .from('t')
  .return('sum(n)')
  .query

{ text: 'with recursive t(n) (select 1 union all (select n + 1 from t where (n < 100))) select sum(n) from t',
  args: [] }
```
