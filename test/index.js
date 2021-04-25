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


table1.return("My co").where(e.eq('app_name', 'asdf')).all()
// table1.insert({ "hello world": "123" }).one();