<<<<<<< Updated upstream
const Notification = require('../model/booking');




module.exports.addNotification = async (userId, userRole, type, message,status) => {
    try {
        
        let notification = await Notification.addNotification(userId, userRole, type, message,status);
=======
var db = require('../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);


module.exports.addNotification = async (userId,admin_id, userRole, type, message,status,image) => {
    try {
        
        let notification = await addNotification(userId,admin_id, userRole, type, message,status,image);
>>>>>>> Stashed changes
        return notification.affectedRows > 0 ? true : false;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
<<<<<<< Updated upstream
module.exports.addNotification = async (userId, userRole, title, message, status) => {
    try {
        const result = await Notification.addNotification(userId, userRole, title, message, status);
        return result.affectedRows > 0;
    } catch (error) {
        console.log("Notification Error:", error.message);
        return false;
    }
};
=======

async function addNotification(user_id, admin_id, role, type, message, status, image){
  var Query= `INSERT INTO notifications(user_id,admin_id,role,type,message,status,n_image) VALUES(?,?,?,?,?,?,?)`;
  var data = await query(Query, [user_id, admin_id, role, type, message, status, image]);
  return data;
}

>>>>>>> Stashed changes
