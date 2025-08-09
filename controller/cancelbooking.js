var model = require('../model/cancelbooking')
const notify = require('../util/notification');

module.exports.cancelBooking = async (req, res) => {
    try {
        let { b_id, b_u_id } = req.body;

        if (!b_id || !b_u_id) {
            return res.send({
                result: false,
                message: "Insufficient parameters"
            });
        }
        const cancelResult = await model.cancelBookingById(b_id, b_u_id);

        if (cancelResult.affectedRows > 0) {
            // Send notification
            await notify.addNotification(
                b_u_id,
                "user",
                "Booking Cancelled",
                "Your booking has been cancelled successfully.",
                "unread"
            );

            return res.send({
                result: true,
                message: "Booking  cancelled successfully"
            });
        }
        else {
            return res.send({
                result: false,
                message: "Booking not found or already cancelled"
            });
        }
    }
    catch (error) {

        return res.send({
            result: false,
            message: error.message
        });
    }
}







