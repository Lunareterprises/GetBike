var db = require('../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

// ✅ Save Aadhar Path
module.exports.AddadharQuery = async (adharPath, u_id) => {
    var Query = `UPDATE user SET u_adharcard = ? WHERE u_id = ?`;
    var data = await query(Query, [adharPath, u_id]);
    return data;
}

// ✅ Save License Path
module.exports.AddlicenseQuery = async (licensePath, u_id) => {
    var Query = `UPDATE user SET u_license = ? WHERE u_id = ?`;
    var data = await query(Query, [licensePath, u_id]);
    return data;
}
