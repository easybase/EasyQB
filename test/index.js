var sq = require('../');

const easyqb = (tableName) => {
  const n = sq({ 
    oneCallback: async (trx, tableName) => {
      trx.count = "one";
      trx.tableName = tableName;
      console.log(trx);
    },
    allCallback: async (trx, tableName) => {
      trx.count = "all";
      trx.tableName = tableName;
      console.log(trx);
    },
    tableName: tableName || "untable" 
  })(tableName || "untable" );
  return n;
}

const table1 = easyqb();
const e = table1.e;

table1.return().where(e.dateEq('dateCol', new Date())).all()
table1.return().where(e.dateLt('dateCol', new Date())).all()
table1.return().where(e.dateGte('dateCol', new Date())).all()
table1.return().where(e.dateNeq('dateCol', new Date())).all()
// table1.return(e.max('Hello Table')).where(e.eq('app_name', 'asdf')).all()
// table1.insert({ "hello world": "123" }).one();