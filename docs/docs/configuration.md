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

## React useReturn

This hook, available in the *easybase-react* package, allows you to have a stateful `frame` that will automatically update its contents to the inputted **Select** query without having called `.all` or `.one`.

There are two events that will cause this to re-fetch the data in `frame`.
1. One of the stateful variables in the `deps` changed. This is the second parameter in the `useReturn` hook, similar to `useEffect`
2. another instance of `db()` did an **Update**, **Insert**, or **Delete** that might effect the data in `frame`.

```jsx
function Component() {
    const [minRating, setMinRating] = useState(0);
    const [limit, setLimit] = useState(10);
    
    const { db, e, useReturn } = useEasybase();

    // 1st param is a function, returning a `db().return` instance without having been executed
    // 2nd param is dependencies that cause a re-fetch when changed
    const { frame } = useReturn(() => db().return()
        .where(e.gt('rating', minRating))
        .limit(limit),
    [minRating, limit]);

    return (
        <div>
            <input
                type="number"
                value={minRating}
                onChange={e => setMinRating(Number(e.target.value))}
            />
            <input
                type="number"
                value={limit}
                onChange={e => setLimit(Number(e.target.value))}
            />
            
            {/* 
                This data re-fetches when: 
                1. The `limit` and `minRating` change
                2. Somewhere within `EasybaseProvider`, db() is used
                   to Update, Delete, or Insert data to the same table
            */}
            {frame.map(ele => <Card {...ele} />)}
        </div>
    )
}
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