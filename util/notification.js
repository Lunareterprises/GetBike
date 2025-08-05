const Notification = require('../model/booking');
const UserToken = require('../model/getUserTokens')


module.exports.addNotification = async (userId, userRole, type, message) => {
    try {
        
        let notification = await Notification.createNotification(userId, userRole, type, message);
        return notification.affectedRows > 0 ? true : false;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}