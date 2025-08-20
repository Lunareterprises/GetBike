var db=require('../config/db');
var util =require("util");
const query = util.promisify(db.query).bind(db);


module.exports.checkbooking =async( user_id,bike_name, bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time,booking_date,invoice,adharcard,license )=>{
   var Query=`insert into bookings(b_u_id,b_bike_name, b_bk_id, b_pickup_location, b_pickup_date, b_picup_time, b_drop_location, b_drop_date, b_drop_time,booking_date,invoice,b_adharcard,b_license)values(?,?,?,?,?,?,?,?,?,?,?,?,?);`
   var data=query(Query,[user_id, bike_name,bike_id, pickup_location, pickup_date, pickup_time, drop_location, drop_date, drop_time,booking_date,invoice,adharcard,license]);
   return data; 
}
// module.exports.addNotification=async(user_id, role, type, message,status)=>{
//   var Query= `insert into  notifications(user_id,role,type,message,status) values(?,?,?,?,?)`;
//   var data=query(Query,[user_id, role, type, message,status]);
//   return data;
// }
module.exports.listbookingQuery=async(condition)=>{
  var Query=`SELECT * FROM  bookings ${condition}`;
  var data= await query(Query);
  return data;
}

module.exports.GetAdmin=async()=>{
  var Query=`SELECT * FROM user where u_role='admin'`;
  var data= await query(Query);
  return data;
}
module.exports.listNotificationQuery = async (condition) => {
     var Query = `SELECT * FROM notifications ${condition}`;
     var data = await query(Query);
    return data;
};
module.exports.getOneBikeImage = async (bike_id) => {
    var Query = `SELECT * FROM bike_images WHERE bike_id= ? LIMIT 1`;
    var data = await query(Query, [bike_id]);
    return data;
};
module.exports.AddBookingImageQuery = async (selfie_path,booking_id) => {
    var Query = `UPDATE bookings SET b_selfie = ? WHERE b_id = ?`;
    var data = await query(Query, [selfie_path, booking_id]);
    return data;
};


