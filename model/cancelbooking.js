var db=require('../config/db');
var util =require("util");
const query = util.promisify(db.query).bind(db);



module.exports.cancelBookingById =async (b_id, b_u_id,view_reason) => {
   var Query=`UPDATE bookings SET b_status = 'cancelled', view_reason = ?   WHERE b_id = ? AND b_u_id = ?`;
    var data=query(Query,[b_id, b_u_id,view_reason]);
    return data;
}

module.exports.GetAdmin=async()=>{
  var Query=`SELECT * FROM user where u_role='admin'`;
  var data= await query(Query);
  return data;
}