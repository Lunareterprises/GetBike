var db =require('../config/db');
var util =require("util");
const query = util.promisify(db.query).bind(db);

module.exports.CheckMail = async (email) => {
    var Query = `select * from user where u_email =?`;
    var data = query(Query, [email]);
    return data;
}

module.exports.AddUser= async (name, email,hashedpasssword, mobile, date) => {
    var Query = `insert into user(u_name,u_email,u_password,u_mobile,u_joindate)values(?,?,?,?,?)`;
    var data = await query(Query, [name, email,hashedpasssword, mobile, date])
    return data;
}
module.exports.checkmobile=async(mobile)=>{
     var Query = `select * from user where u_mobile=? `;
    var data = query(Query, [mobile]);
    return data;

}

