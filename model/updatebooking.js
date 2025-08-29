var db = require('../config/db');
var util = require('util');
const query = util.promisify(db.query).bind(db);

module.exports.updateBookingStatus = async (b_id, b_u_id,b_status) => {
    var Query  = `UPDATE bookings SET b_status = ? WHERE b_id = ? AND b_u_id = ?`;


    var data=  await query(Query, [b_status, b_id, b_u_id]);
    return data;

};
module.exports.findBooking = async (b_id, b_u_id) => {
    var Query = `SELECT * FROM bookings WHERE b_id = ? AND b_u_id = ?`;
    return await query(Query, [b_id, b_u_id]);
};
module.exports.GetAdmin=async()=>{
  var Query=`SELECT * FROM user where u_role='admin'`;
  var data= await query(Query);
  return data;
}
