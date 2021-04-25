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


table1.delete.where(e.eq('app_name', 'asdf')).all()