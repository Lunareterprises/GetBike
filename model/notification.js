var db = require("../config/db")
var util = require("util")
const query = util.promisify(db.query).bind(db);

// Correct binding

module.exports.createNotification = async (user_id, role, type, message, status = 'unread') => {
    const sql = `INSERT INTO notifications (user_id, role, type, message, status) VALUES (?, ?, ?, ?, ?)`;
    return await query(sql, [user_id, role, type, message, status]);
};

module.exports.getUserNotifications = async (userId) => {
    const sql = `SELECT * FROM notifications WHERE user_id = ? ORDER BY n_id DESC`;
    return await query(sql, [userId]);
};

module.exports.markAsRead = async (notificationId) => {
    const sql = `UPDATE notifications SET status = 'read' WHERE n_id = ?`;
    return await query(sql, [notificationId]);
};
