---
id: delete-queries
title: Delete
nav_order: 12
---

## Overview

* **Delete** [`.delete`](#delete)
* **Where** [`.where`](#where)

## Delete

Delete queries look like [Select](/docs/select_queries.html) queries with an additional call to `.delete`. **This will return the number of rows deleted.**


```js
await table.delete().one();
> 1

//  { "title": "Avatar", "rating": 83 },
```

Executing a delete query with `.one` only deletes the first row found, whereas `.all` will delete all rows found.

```js
await table.delete().where(e.gt('rating', 55)).all();
> 3

// [
//   { "title": "Avatar", "rating": 83 },
//   { "title": "Titanic", "rating": 75 },
//   { "title": "Jurassic World", "rating": 59 }
// ]
```

## Where

Filter the rows to delete with `.where`.

```js
await table.delete().where(
  e.or(
    e.eq("title", "The Lion King"), // Equals
    e.gt("rating", 80) // Greater than
  )
).all()
> 2

// [
//   { "title": "Avatar", "rating": 83 },
//   { "title": "The Lion King", "rating": 55 }
// ]
```

Note that `.where` works in delete queries just it does in [select](/docs/select_queries.html#where) queries.
