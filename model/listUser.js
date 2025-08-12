var db=require('../config/db');
var util =require("util");
const query = util.promisify(db.query).bind(db);


module.exports.listUserQuery=async(condition)=>{
  var Query=`SELECT * FROM  user ${condition}`;
  var data= await query(Query);
  return data;
}