---
id: configuration
title: Configuration
nav_order: 15
---

## Configuration

The `.db` function takes two optional parameters:

1. Table name: `string`
2. User associated records only: `boolean`

The first specifies which table the database operations will be performed on (required for Projects) and the second to detail whether or not you want this instance to only get/set records only associated to the currently signed-in user. **This defaults to false.**

After enabling this option, all inserted records will be automatically associated to that user. This is visible in the [Easybase](https://easybase.io/) interface by selecting table rows. Read, update, and delete operations will only be performed on records that are already associated to the current user.

```js
const table = Easybase.EasybaseProvider({ ebconfig }).db("MYTABLE", true); // User associated records only
```

## Event Listener

The `dbEventListener` function exported from the _easybasejs_ and _easybase-react_ packages takes a callback function that will be ran twice whenever a `db` operation is **executed with `.all` or `.one`**.

This callback function takes 3 optional parameters:

1. _status_: "pending", "success", "error"
2. _queryType_: "select", "update", "insert", "delete"
3. _queryCount_: "one", "all"

It will first be ran when the package is waiting for a response, then when the execution is finished. It also returns an executable function that, when run, unsubscribes that specific callback from future events.

```js
const eb = Easybase.EasybaseProvider({ ebconfig });
const table = eb.db();
const { e } = table;

const listenerA = eb.dbEventListener((status, queryType, queryCount) => {
    console.log("A: ", status, queryType, queryCount)
})

await table.insert({ "app name": 'MyApplify', _position: 0 }).one();

eb.dbEventListener((status, queryType, queryCount) => {
    console.log("B: ", status, queryType, queryCount)
})
listenerA()

await table.return().where(e.like('App Name', '%2')).all();

// A:  pending insert one
// A:  success insert one
// B:  pending select all
// B:  success select all
```