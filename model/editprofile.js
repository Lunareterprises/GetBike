var db=require("../config/db.js");
var util = require("util");

const query = util.promisify(db.query).bind(db);

module.exports.CheckUserQuery = async (u_id) => {
    var Query = `select * from user where u_id= ?`;
    var data = query(Query, [u_id]);
    return data;
};

module.exports.ChangeUserInfo = async (condition, u_id) => {
    var Query = `update user ${condition} where u_id = ?`;
    var data = query(Query, [u_id]);
    return data;
};
module.exports.Updateimage = async (image, u_id) => {
    var Query = `update user set u_profile_pic= ?  where u_id = ? `;
    var data = query(Query, [image, u_id]);
    return data;
};
