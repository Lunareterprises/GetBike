

module.exports.addNotification = async (userId,admin_id, userRole, type, message,status) => {
    try {
        
        let notification = await addNotification(userId,admin_id, userRole, type, message,status);
        return notification.affectedRows > 0 ? true : false;
    } catch (error) {
        console.log("Notification Error:",error.message);
        return false;
    }
}
<<<<<<< Updated upstream
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
=======
module.exports.addNotification = async (userId, userRole, title, message, status) => {
    try {
        const result = await Notification.addNotification(userId, userRole, title, message, status);
        return result.affectedRows > 0;
    } catch (error) {
        console.log("Notification Error:", error.message);
        return false;
    }
};
module.exports.listNotification = async (userId) => {
    try {
        let condition = '';
        if (userId) {
            condition = `WHERE user_id = '${userId}'`;
        }
        const notifications = await Notification.listNotificationQuery(condition);
        return notifications;
    } catch (error) {
        console.error("List Notification Error:", error.message);
        return [];
    }
};
>>>>>>> Stashed changes
