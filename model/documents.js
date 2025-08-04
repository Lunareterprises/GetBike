var db=require('../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.AddadharQuery=async(adharpath)=>{
 var Query =`insert into documents (d_adhar)  values(?)`;
 var data=query(Query,[adharpath]);
 return data;

}

module.exports.AddlicenseQuery=async(licensePath)=>{
    var query=`insert into documents(d_license) values(?)`;
    var data=query(Query,[licensePath]);
    return data;

}