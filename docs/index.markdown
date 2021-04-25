---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

## Easybase Query Builder for JavaScript

<br />

This project is based on [sqorn](https://github.com/sqorn/sqorn) using functional expressions and conditionals. It's [almost] a subset, so some features included in Sqorn are not available in this package. More information on this is available below. If you're just starting out, head to the [Select](/docs/select_queries.html) page to begin.

EasyQB is built into both [_easybase-react_](https://github.com/easybase/easybase-react) and [_easybasejs_](https://github.com/easybase/easybasejs) through the `db` function. It will become the standard query functionality for Easybase, replacing **Frame** which will become deprecated.

The documentation outlined here is very much shortened version of that available on the Sqorn website.

```js
import Easybase from "easybasejs";
import ebconfig from "./ebconfig.js";

const table = Easybase.EasybaseProvider({ ebconfig }).db;
const { e } = table;

const deletedNum = await table.delete.where(e.eq('app name', 'right now')).one();
// const t = await table.insert({ "app name": 'right now', _position: 0 }).one();
console.log(deletedNum)
const res = await table.where(e.gt('rating', 15)).limit(10).all();
console.log(res);
```

Before using this library, you must create and account an account at [easybase.io](https://easybase.io/) and [configure your project](https://easybase.io/react/#setup).

<hr />

If you need more information, feel free to **cautiously** look at the [Sqorn docs](https://sqorn.org/docs/about.html). This package is [almost] a subset of Sqorn, so not all features from that package will work with Easybase. This documentation should cover everything necessary to using this package with Easybase.


Not included from Sqorn:
* Tagged template literals and the corresponding chaining
* Manual building with `.sql` and `.txt`
* Fragments
* Distinct, Sets, and Join
* SQL String Operations (`.eq` and others work)
* Asynchronous transactions
* The mapping Configurations

### Built With

* [Sqorn](https://github.com/sqorn/sqorn)
* [easybase.io](https://easybase.io)
* [microbundle](https://github.com/developit/microbundle)