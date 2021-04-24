var sq = require('../');

const easyqb = (tableName) => {
  const n = sq({ oneCallback: console.log, allCallback: console.log })(tableName);
  return n;
}

const table1 = easyqb('table1');
const exp = table1.e;

const table2 = easyqb('table2');
const { e: e2 } = table2;

console.log(
  table1.return(exp.add('col1')).return('123').where(
    exp.and(
      exp.eq`first_name`('Mohammed'),
      exp.gt('age', '30'),
      exp.gte`age`('30'),
      exp.lteAny("asdf", "cc")
    )
  ).groupBy('hello').one(),

);