---
id: insert-queries
title: Insert
nav_order: 11
---

## Overview

* **Insert** [`.insert`](#insert)

## Insert

Use `.insert` to specify data to insert into your data table. **This will return the number of records inserted**.

```js
await table.insert({ title: "Forest Gump", rating: 82 }).one()
> 1

// { title: "Forest Gump", rating: 82 }
```

Columns that are not passed in the new entry will be cast to *null*.

```js
await table.insert({ title: "Forest Gump" }).one()
> 1

// { title: "Forest Gump", rating: null }
```

To insert multiple rows, pass multiple objects. Column names are inferred from the keys of all objects.

Executing this command with either `.all` or `.one` will only insert one copy of the provided rows.

```js
await table.insert(
  { title: "Forest Gump", rating: 82 },
  { title: "Joker", rating: 58 },
  { title: "Inception" }
).one()
> 3

// [
//   { title: "Forest Gump", rating: 82 },
//   { title: "Joker", rating: 58 },
//   { title: "Inception", rating: null }
// ]
```
