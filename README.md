<p align="center">
  <a href="https://easybase.io">
    <img src="https://easybase.io/assets/images/logo_black.png" alt="easybase logo black" width="80" height="80">
  </a>
</p>

<br />

# Easybase Query Builder
This project is based on [sqorn](https://github.com/sqorn/sqorn) using functional expressions and conditionals. There's no execution workflow or [manual query builder](https://sqorn.org/docs/about#manual-query-builder). Typings are also included.

<!-- ABOUT THE PROJECT -->
## About The Project

Database CRUD operations can be built intuitively and safely. To be used in the [_easybasejs_](https://github.com/easybase/easybasejs) and [_easybase-react_](https://github.com/easybase/easybase-react) packages.

**From Sqorn**:
> Composable: Build complex queries from simple parts. Chain, extend, and embed queries.
>
> Intuitive: Sqorn's use of modern Javascript language features like tagged template literals and promises makes building and issuing SQL queries a breeze.
>
> Concise: Sqorn provides concise syntax for common CRUD operations.
>
> Fast: 10x faster than Knex.js and 200x faster than Squel
>
> Secure: Sqorn generates parameterized queries safe from SQL injection. Sqorn has no external dependencies.

### Built With

* [Sqorn](https://github.com/sqorn/sqorn)
* [easybase.io](https://easybase.io)
* [microbundle](https://github.com/developit/microbundle)

<!-- USAGE EXAMPLES -->
## Usage

```js
var sq = require('./src');

const easyqb = (tableName) => {
  const n = sq({ oneCallback: async () => { }, allCallback: async () => { } })(tableName);
  sq.from = undefined;
  return n;
}

const table1 = easyqb('table1');
const exp = table1.e;

const table2 = easyqb('table2');
const { e: e2 } = table2;

console.log(
  table1.return('first_name').where(
    exp.and(
      exp.eq('first_name', 'Mohammed'),
      exp.gt('age', '30'),
        )
      ).one(),
  
      table2.return('first_name').where(
        e2.and(
          e2.eq('first_name', 'Mohammed'),
          e2.gt('age', '30'),
        )
      ).all(),

);
```

<!-- EXAMPLES -->
## Examples

[Starting from scratch to serverless database + authentication](https://easybase.io/react/)

[Stateful database array walkthrough](https://easybase.io/react/2020/09/20/The-Best-Way-To-Add-A-Database-To-Your-React-React-Native-Apps/)

[User authentication walkthrough](https://www.freecodecamp.org/news/build-react-native-app-user-authentication/)

[Deploying cloud functions](https://easybase.io/react/2021/03/09/The-Easiest-Way-To-Deploy-Cloud-Functions-for-your-React-Projects/)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

[@easybase_io](https://twitter.com/easybase_io) - hello@easybase.io

Project Link: [https://github.com/easybase/easybase-react](https://github.com/easybase/easybase-react)

<a href="https://www.producthunt.com/posts/easybase-io?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-easybase-io" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=278380&theme=dark" alt="Easybase.io - Serverless platform for apps and projects. React.js Focused. | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
