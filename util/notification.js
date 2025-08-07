const Notification = require('../model/booking');




module.exports.addNotification = async (userId, userRole, type, message,status) => {
    try {
        
        let notification = await Notification.addNotification(userId, userRole, type, message,status);
        return notification.affectedRows > 0 ? true : false;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
module.exports.addNotification = async (userId, userRole, title, message, status) => {
    try {
        const result = await Notification.addNotification(userId, userRole, title, message, status);
        return result.affectedRows > 0;
    } catch (error) {
        console.log("Notification Error:", error.message);
        return false;
    }
};
