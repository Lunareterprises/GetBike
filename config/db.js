var mysql =require("mysql");
//initialize pool
var pool =mysql.createPool({
    connectionLimit:10,
    host:"srv1132.hstgr.io",
    user:"u160357475_getbike",
    password:"123abcAB@123",
    database:"u160357475_getbike",
    connectTimeout: 30000 , // <-- 30 seconds timeout
    dateStrings: true
});
pool.getConnection((err,connection)=>{
    if (err)throw err;
    console.log("connected to Mysqldatabase");
    connection.release();
});
module.exports=pool;

