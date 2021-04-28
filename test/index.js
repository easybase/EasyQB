var sq = require('../');

const easyqb = (tableName) => {
  const n = sq({ 
    oneCallback: async (trx, tableName, userAssociatedRecordsOnly) => {
      trx.count = "one";
      trx.tableName = tableName;
      if(userAssociatedRecordsOnly) trx.userAssociatedRecordsOnly = userAssociatedRecordsOnly;
      console.log(trx)
    },
    allCallback: async (trx, tableName, userAssociatedRecordsOnly) => {
      trx.count = "all";
      trx.tableName = tableName;
      if(userAssociatedRecordsOnly) trx.userAssociatedRecordsOnly = userAssociatedRecordsOnly;
      console.log(trx)
    },
    tableName: tableName || "untable",
    userAssociatedRecordsOnly: tableName? true : false
  })(tableName || "untable");
  return n;
}

async function main() {
  const table1 = easyqb();
  table1.delete()
  table1.return().where(e.and({"h": 123, "bn": 1243}))
  const e = table1.e;
  // await table1.return().where(e.dateGte('dateCol', new Date())).all()
  await table1.return().where({ hello: "word", _key: 123 }).all()
  await table1.delete().where(e.or(e.gte('rating', 20), e.in('helklo', [1, 2, 3]), e.eq('_key', "asdfasdfds"))).one()
  // await table1.delete().where(e.eq('hello', 'world')).one()
  // await table1.return().where({ hello: "world"}).one()
  // await table1.return().one()
}
// table2.return().where(e.dateLt('dateCol', new Date())).all()
// table2.return().where(e.dateNeq('dateCol', new Date())).all()
// table1.return(e.max('Hello Table')).where(e.eq('app_name', 'asdf')).all()
// table1.insert({ "hello world": "123" }).one();

main();