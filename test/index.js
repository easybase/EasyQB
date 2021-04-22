var sq = require('../');

const easyqb = (tableName) => {
  const n = sq({ oneCallback: console.log, allCallback: async () => { } })(tableName);
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