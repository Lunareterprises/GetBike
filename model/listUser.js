var db=require('../config/db');
var util =require("util");
const query = util.promisify(db.query).bind(db);


module.exports.listUserQuery=async(condition)=>{
  var Query=`SELECT * FROM  user where u_role = 'user' ${condition} `;
  var data= await query(Query);
  return data;
}

module.exports.listAdminQuery=async()=>{
  var Query=`SELECT * FROM  user where u_role = 'admin' `;
  var data= await query(Query);
  return data;
}
module.exports.deleteUserQuery = async (user_id) => {
    var Query = `DELETE FROM user WHERE u_id = ?`;
    var data = await query(Query, [user_id]);
    return data;
};
