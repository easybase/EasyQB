---
id: update-queries
title: Update
nav_order: 13
redirect_to: 'https://docs.easybase.io/projects/database/update'
---

## Overview

* **Set** [`.set`](#set)
* **Where** [`.where`](#where)

## Set

`.set` specifies the fields to update in the form of `{ field: value }`. It can accept multiple object, but these will be merged into one.

```js
await table.set({ title: "Pulp Fiction" }).one()
> 1

// { "title": "Pulp Fiction", "rating": 83 },
```

Using `.all` applies to the same query logic as Select and Delete.

```jsx
await table.set({ title: "Pulp Fiction" }).all()
> 4

// [
//   { "title": "Pulp Fiction", "rating": 83 },
//   { "title": "Pulp Fiction", "rating": 75 },
//   { "title": "Pulp Fiction", "rating": 55 },
//   { "title": "Pulp Fiction", "rating": 59 }
// ]
```

## Where

Filter the rows to update with `.where`.

```js
await table.where(
  e.or(
    e.eq("title", "The Lion King"), // Equals
    e.gt("rating", 80) // Greater than
  )
).set({ rating: -1 }).all()
> 2

// [
//   { "title": "Avatar", "rating": -1 },
//   { "title": "The Lion King", "rating": -1 }
// ]
```

Update specific record with `.where`.
```js
// Select returns a unique identifier called _key
let singleRecord = table.return().where(e.like('title', "Jurassic World")).one()

await table.where({ _key: singleRecord._key }).set({ title: "Pulp Fiction" }).one()
> 1

// { "title": "Pulp Fiction", "rating": 59 }
```

Note that `.where` works in update queries just as it does in [select](select_queries.html#where) queries.
