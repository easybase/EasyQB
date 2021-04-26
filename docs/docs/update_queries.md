---
id: update-queries
title: Update
nav_order: 13
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
await table
  .where({ firstName: 'Matt' })
  .set({ firstName: 'Robert', nickname: 'Rob' })
  .query

{ text: 'update person set first_name = $1, nickname = $2 where (first_name = $3)',
  args: ['Robert', 'Rob', 'Matt'] }
```

Note that `.where` works in update queries just as it does in [select](/docs/select_queries.html#where) queries.
