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
  table1.return(exp.eq('aa', 'fantasy')).return('123').where(
    exp.and(
      exp.eq`first_name`('Mohammed'),
      exp.gt('age', '30'),
      exp.gte`age`('30')
    )
  ).groupBy('hello').one(),
  
  table2.set({ firstName: 'Robert', nickname: 'Rob' })
    .where({ firstName: 'Matt' })
    .all(),

  table2.insert({ firstName: 'Shallan', lastName: 'Davar' }).all(),

    table1.delete().where(
      exp.and(
        exp.lt('col', 12),
        exp.gte('col', '70')
      )
    ).one(),

    table1.set({ available: false }).one(),

);