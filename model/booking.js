var db=require('../config/db');
var util =require("util");
const query = util.promisify(db.query).bind(db);


module.exports.checkbooking =async( user_id, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time )=>{
   var Query=`insert into bookings(b_u_id, b_bk_id, b_pickup_location, b_pickup_date, b_picup_time, b_drop_location, b_drop_date, b_drop_time
 )values(?,?,?,?,?,?,?,?);`
   var data=query(Query,[user_id, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time]);
   return data; 
}