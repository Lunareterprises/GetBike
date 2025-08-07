var db=require('../config/db');
var util =require("util");
const query = util.promisify(db.query).bind(db);



module.exports.cancelBookingById =async (b_id, b_u_id) => {
   var Query=`UPDATE bookings SET b_status = 'cancelled' WHERE b_id = ? AND b_u_id = ?`;
    var data=query(Query,[b_id, b_u_id]);
    return data;
}