var db=require('../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.AddadharQuery=async(u_id,adharpath)=>{
 var Query =`update user SET u_adharcard=? where u_id=?`;
 var data= await query(Query,[adharpath, u_id]);
 return data;

}

module.exports.AddlicenseQuery=async(licensePath, u_id)=>{
    var Query=`UPDATE user SET u_license = ? WHERE u_id = ?`;
    var data= await query(Query,[licensePath, u_id]);
    return data;

}