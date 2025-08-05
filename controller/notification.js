const Notification = require('../model/notification');

// Get notifications for a user
exports.getUserNotifications = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const data = await Notification.getUserNotifications(userId);
        res.json({ result: true, data });
    } catch (error) {
        res.status(500).json({ result: false, message: error.message });
    }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
    try {
        const id = req.body.id;
        await Notification.markAsRead(id);
        res.json({ result: true, message: "Notification marked as read" });
    } catch (error) {
        res.status(500).json({ result: false, message: error.message });
    }
};

// Optional: Create notification
exports.createNotification= async (req, res) => {
    try {
        const { user_id, role, type, message } = req.body;
        const result = await Notification.createNotification(user_id, role, type, message);
        res.json({ result: true, message: "Notification created", data: result });
    } catch (error) {
        res.status(500).json({ result: false, message: error.message });
    }
};
