var db = require("../config/db");
var util =require ("util")
const query = util.promisify(db.query).bind(db);


module.exports.CheckUser=async(emailorphone_number,role)=>{
    var Query=`SELECT * FROM user
    WHERE (u_email = ? OR u_mobile = ?) AND u_role = ?`
    var data= await query(Query,[emailorphone_number,emailorphone_number,role])
    return data;
}