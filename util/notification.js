

module.exports.addNotification = async (userId,admin_id, userRole, type, message,status) => {
    try {
        
        let notification = await addNotification(userId,admin_id, userRole, type, message,status);
        return notification.affectedRows > 0 ? true : false;
    } catch (error) {
        console.log("Notification Error:",error.message);
        return false;
    }
}
// module.exports.addNotification = async (userId, userRole, title, message, status) => {
//     try {
//         const result = await Notification.addNotification(userId, userRole, title, message, status);
//         return result.affectedRows > 0;
//     } catch (error) {
//         console.log("Notification Error:", error.message);
//         return false;
//     }
// };

async function addNotification(user_id,admin_id, role, type, message,status){
  var Query= `insert into  notifications(user_id,admin_id,role,type,message,status) values(?,?,?,?,?,?)`;
  var data=query(Query,[user_id,admin_id, role, type, message,status]);
  return data;
}
